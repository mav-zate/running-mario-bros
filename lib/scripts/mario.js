
const STANDING = 'STANDING';
const RUNNING = 'RUNNING';
const JUMPING = 'JUMPING';
const CANVAS_HEIGHT = 500;
const BRICK_LENGTH = 40;

class Mario {
  constructor(context) {
    this.state = {
      xPos: 2 * BRICK_LENGTH,
      yPos: CANVAS_HEIGHT - (3 * BRICK_LENGTH),
      prevXPos: -1,
      prevYPos: -1,
      status: STANDING,
      image: {
        standing: new Image(),
        running: [new Image(), new Image(), new Image()],
        jumping: new Image(),
      },
      runIdx: 0,
    };
    this.context = context;
    this.initialize();

    this.render = this.render.bind(this);
    this.move = this.move.bind(this);
    this.jump = this.jump.bind(this);
    this.setRunning = this.setRunning.bind(this);
    this.setJumping = this.setJumping.bind(this);
  }

  initialize() {
    this.state.image.standing.src = "https://s3.amazonaws.com/running-mario-bros-dev/mario/standing.png";
    this.state.image.running[0].src = "https://s3.amazonaws.com/running-mario-bros-dev/mario/running_armFront.png";
    this.state.image.running[1].src = "https://s3.amazonaws.com/running-mario-bros-dev/mario/running_armDown.png";
    this.state.image.running[2].src = "https://s3.amazonaws.com/running-mario-bros-dev/mario/running_armBack.png";
    this.state.image.jumping.src = "https://s3.amazonaws.com/running-mario-bros-dev/mario/jumping.png";
  }

  render() {
    // Erase previous rectangle if any
    if (this.state.prevXPos !== -1 || this.state.prevYPos !== -1) {
      this.context.clearRect(this.state.prevXPos, this.state.prevYPos,
        BRICK_LENGTH, BRICK_LENGTH);
      this.state.prevXPos = -1;
      this.state.prevYPos = -1;
    } else {
      this.context.clearRect(this.state.xPos, this.state.yPos,
        BRICK_LENGTH, BRICK_LENGTH);
    }

    // re-render Mario
    switch (this.state.status) {
      case STANDING:
        this.runIdx = 0;
        this.context.drawImage(this.state.image.standing,
          this.state.xPos, this.state.yPos,
          3 * BRICK_LENGTH / 4, BRICK_LENGTH);
        break;
      case RUNNING:
        this.runIdx = (this.runIdx + 1) % this.state.image.running.length;
        this.context.drawImage(this.state.image.running[this.runIdx],
          this.state.xPos, this.state.yPos,
          3 * BRICK_LENGTH / 4, BRICK_LENGTH);
          break;
      case JUMPING:
        this.runIdx = 0;
        this.context.drawImage(this.state.image.jumping,
          this.state.xPos, this.state.yPos,
          3 * BRICK_LENGTH / 4, BRICK_LENGTH);
          break;
      default:
        return;
    }
  }

  move(dx, dy) {
    this.state.prevXPos = this.state.xPos;
    this.state.prevYPos = this.state.yPos;
    this.state.xPos += dx * 8;
    this.state.yPos += dy * 8;
  }

  jump(e) {
    if (e.key === " ") {
      this.move(0, -1);
      this.setJumping();
    }
  }

  setRunning() {
    this.state.status = RUNNING;
  }

  setJumping() {
    this.state.status = JUMPING;
  }
}

export default Mario;
