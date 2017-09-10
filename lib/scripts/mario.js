
const STANDING = 'STANDING';
const RUNNING = 'RUNNING';
const JUMPING = 'JUMPING';
const DYING = 'DYING';
const CANVAS_HEIGHT = 500;
const SMALL_MARIO_HEIGHT = 40;
const SMALL_MARIO_WIDTH =  3 * SMALL_MARIO_HEIGHT / 4;
const BRICK_LENGTH = 40;
const G_ACCELERATION = 4;

class Mario {
  constructor(context, themeMusic, deathSound) {
    this.state = {
      xPos: 2 * SMALL_MARIO_HEIGHT,
      yPos: CANVAS_HEIGHT - (3 * SMALL_MARIO_HEIGHT),
      prevXPos: -1,
      prevYPos: -1,
      status: STANDING,
      image: {
        standing: new Image(),
        running: [new Image(), new Image(), new Image()],
        jumping: new Image(),
        dying: new Image(),
      },
      music: {
        theme: themeMusic,
        death: deathSound,
      },
      jump: {
        baseHeight: -1,
        velocity: -1,
      },
      others: [],
      runIdx: 0,
    };
    this.context = context;
    this.initialize();

    this.render = this.render.bind(this);
    this.jump = this.jump.bind(this);
    this.renderJump = this.renderJump.bind(this);
    this.setRunning = this.setRunning.bind(this);
    this.setJumping = this.setJumping.bind(this);
    this.handleBottomCollision = this.handleBottomCollision.bind(this);
    this.handleFrontCollision = this.handleFrontCollision.bind(this);
    this.receiveOthers = this.receiveOthers.bind(this);
    this.removeOther = this.removeOther.bind(this);
    this.renderDeath = this.renderDeath.bind(this);
    this.landOn = this.landOn.bind(this);
    this.setPos = this.setPos.bind(this);
    this.getPos = this.getPos.bind(this);
    this.die = this.die.bind(this);
    this.playTheme = this.playTheme.bind(this);
    this.playDeath = this.playDeath.bind(this);
  }

  initialize() {
    this.state.image.standing.src = "https://s3.amazonaws.com/running-mario-bros-dev/mario/standing.png";
    this.state.image.running[0].src = "https://s3.amazonaws.com/running-mario-bros-dev/mario/running_armFront.png";
    this.state.image.running[1].src = "https://s3.amazonaws.com/running-mario-bros-dev/mario/running_armDown.png";
    this.state.image.running[2].src = "https://s3.amazonaws.com/running-mario-bros-dev/mario/running_armBack.png";
    this.state.image.jumping.src = "https://s3.amazonaws.com/running-mario-bros-dev/mario/jumping.png";
    this.state.image.dying.src = "https://s3.amazonaws.com/running-mario-bros-dev/mario/death.png";
  }

  render() {
    // Erase previous rectangle if any
    if (this.state.prevXPos !== -1 || this.state.prevYPos !== -1) {
      this.context.clearRect(this.state.prevXPos, this.state.prevYPos,
        SMALL_MARIO_HEIGHT, SMALL_MARIO_HEIGHT);
      this.state.prevXPos = -1;
      this.state.prevYPos = -1;
    } else {
      this.context.clearRect(this.state.xPos, this.state.yPos,
        SMALL_MARIO_HEIGHT, SMALL_MARIO_HEIGHT);
    }


    // handle bottom collisions
    this.handleFrontCollision();
    if (this.state.status === JUMPING) {
      this.handleBottomCollision();
    }

    // re-render Mario
    switch (this.state.status) {
      case STANDING:
        this.runIdx = 0;
        this.context.drawImage(this.state.image.standing,
          this.state.xPos, this.state.yPos,
          SMALL_MARIO_WIDTH, SMALL_MARIO_HEIGHT);
        break;
      case RUNNING:
        this.runIdx = (this.runIdx + 1) % this.state.image.running.length;
        this.context.drawImage(this.state.image.running[this.runIdx],
          this.state.xPos, this.state.yPos,
          SMALL_MARIO_WIDTH, SMALL_MARIO_HEIGHT);
        break;
      case JUMPING:
        this.renderJump();
        break;
      case DYING:
        this.renderDeath();
        break;
      default:
        return;
    }
  }

  landOn(pos) {
    this.setPos(this.state.xPos, pos[1] - SMALL_MARIO_HEIGHT);
    this.setRunning();
  }

  setPos(x, y) {
    this.state.xPos = x;
    this.state.yPos = y;
  }

  renderDeath() {
    this.state.jump.velocity -= G_ACCELERATION;
    this.state.yPos -= this.state.jump.velocity;
    this.context.drawImage(this.state.image.dying,
      this.state.xPos, this.state.yPos,
      SMALL_MARIO_WIDTH, SMALL_MARIO_HEIGHT);
  }

  renderJump() {
    if (this.state.yPos <= this.state.jump.baseHeight) {
      this.state.jump.velocity -= G_ACCELERATION;
      this.state.yPos -= this.state.jump.velocity;
    } else {
      this.setRunning();
    }
    this.context.drawImage(this.state.image.jumping,
      this.state.xPos, this.state.yPos,
      SMALL_MARIO_WIDTH, SMALL_MARIO_HEIGHT);
  }

  jump(e) {
    if (e.key === " " && this.state.status === RUNNING) {
      this.runIdx = 0;
      this.setJumping();
    }
  }

  setRunning() {
    this.state.status = RUNNING;
  }

  setJumping() {
    this.state.status = JUMPING;
    this.state.jump.baseHeight = this.state.yPos;
    this.state.jump.velocity = 30;
  }

  handleBottomCollision() {
    let currentBottom = this.state.yPos + SMALL_MARIO_HEIGHT;
    let nextYPos = this.state.yPos - (this.state.jump.velocity - G_ACCELERATION);
    let nextBottom = nextYPos + SMALL_MARIO_HEIGHT;


    this.state.others.forEach(other => {
      let otherPos = other.getPos();
      let withinXRange = this.state.xPos >= otherPos[0] &&
                         this.state.xPos <= otherPos[0] + BRICK_LENGTH;
      if (withinXRange && currentBottom > otherPos[1] ||
        withinXRange && nextBottom >= otherPos[1]) {
        console.log('bottom-collision');
        if (other.constructor.name === 'Goomba') {
          other.die();
          this.setJumping();
        } else {
          this.landOn(otherPos);
        }
        return;
      }
    });
  }

  handleFrontCollision() {
    let marioBottom = this.state.yPos + SMALL_MARIO_HEIGHT;
    let marioFront = this.state.xPos + SMALL_MARIO_WIDTH;

    this.state.others.forEach(other => {
      let otherPos = other.getPos();
      let minKillHeight = otherPos[1] + (other.getHeight() / 2);
      if (marioFront >= otherPos[0] && marioBottom > minKillHeight
        && otherPos[0] >= this.state.xPos) {
        if (this.state.status !== DYING) {
          this.die();
          this.playDeath();
        }
        console.log('front-collision');
        return;
      }
    });
  }

  receiveOthers(others) {
    this.state.others = this.state.others.concat(others);
  }

  removeOther(otherId) {
    let index;

    for (let i = 0; i < this.state.others.length; i++) {
      if (this.state.others[i].getId() === otherId) {
        index = i;
        break;
      }
    }

    this.state.others.splice(index, 1);
  }

  getPos() {
    return [this.state.xPos, this.state.yPos];
  }

  die() {
    this.state.status = DYING;
    this.state.jump.velocity = 40;
  }

  playTheme() {
    this.state.music.theme.play();
  }

  playDeath() {
    this.state.music.theme.pause();
    this.state.music.death.play();
  }
}

/* mario, possible collisions:
  1. land on other object
    - if bottom of mario greater than top of other
    - or if next position greater than top of other
  2. hit side of other object
  3. hit bottom of other object
*/


export default Mario;
