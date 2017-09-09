const GOOMBA_LENGTH = 40;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 500;

class Goomba {
  constructor(context, id) {
    this.state = {
      id: id,
      xPos: CANVAS_WIDTH,
      yPos: CANVAS_HEIGHT - (3 * GOOMBA_LENGTH),
      prevXPos: -1,
      prevYPos: -1,
      images: [new Image(), new Image()],
      alive: true,
      runIdx: 0,
      speed: 4,
      height: GOOMBA_LENGTH,
    };
    this.context = context;

    this.render = this.render.bind(this);
    this.setPos = this.setPos.bind(this);
    this.setSpeed = this.setSpeed.bind(this);
    this.getHeight = this.getHeight.bind(this);
    this.getId = this.getId.bind(this);
    this.getSpeed = this.getSpeed.bind(this);
    this.initialize();
  }

  initialize() {
    this.state.images[0].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/goomba/goomba_left.png";
    this.state.images[1].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/goomba/goomba_right.png";
  }

  render() {
    // erase prev rectangle
    if (this.state.prevXPos !== -1 || this.state.prevYPos !== -1) {
      this.context.clearRect(this.state.prevXPos, this.state.prevYPos,
        GOOMBA_LENGTH, GOOMBA_LENGTH);
      this.state.prevXPos = -1;
      this.state.prevYPos = -1;
    } else {
      this.context.clearRect(this.state.xPos, this.state.yPos,
        GOOMBA_LENGTH, GOOMBA_LENGTH);
    }


    // re-render Goomba
    if (this.state.alive) {
      this.state.runIdx = (this.state.runIdx + 1) % this.state.images.length;
      this.context.drawImage(this.state.images[this.state.runIdx],
      this.state.xPos, this.state.yPos, GOOMBA_LENGTH, GOOMBA_LENGTH);
    }

    this.setPos(this.state.xPos - this.state.speed, this.state.yPos);
  }

  setPos(x, y) {
    this.state.prevXPos = this.state.xPos;
    this.state.prevYPos = this.state.yPos;
    this.state.xPos = x;
    this.state.yPos = y;
  }

  getPos() {
    return [this.state.xPos, this.state.yPos];
  }

  setSpeed(speed) {
    this.state.speed = speed;
  }

  getHeight() {
    return this.state.height;
  }

  getId() {
    return this.state.id;
  }

  getSpeed() {
    return this.state.speed;
  }
}

export default Goomba;
