const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 800;
const BRICK_LENGTH = 40;
const SPEED = 4;

class Brick {
  constructor(context, id) {
    this.state = {
      image: new Image(),
      oldXPos: -1,
      xPos: -1,
      yPos: -1,
      length: BRICK_LENGTH,
      id: id,
      speed: SPEED,
    };
    this.context = context;

    this.initialize();
    this.setPos = this.setPos.bind(this);
    this.getImage = this.getImage.bind(this);
    this.getPos = this.getPos.bind(this);
    this.getId = this.getId.bind(this);
    this.getHeight = this.getHeight.bind(this);
    this.isObselete = this.isObselete.bind(this);
    this.render = this.render.bind(this);
  }

  initialize() {
    this.state.image.src =
      "https://s3.amazonaws.com/running-mario-bros-dev/env/8bit_brick.png";
  }

  render() {
    // clear old image
    if (this.state.oldXPos !== -1) {
      this.context.clearRect(this.state.oldXPos, this.state.yPos,
        BRICK_LENGTH, BRICK_LENGTH);
    }
    // move background
    this.state.oldXPos = this.state.xPos;
    this.state.xPos -= this.state.speed;
    // draw
    this.context.drawImage(this.state.image,
      this.state.xPos, this.state.yPos, BRICK_LENGTH, BRICK_LENGTH);
  }

  setPos(x, y) {
    this.state.xPos = x;
    this.state.yPos = y;
  }

  getPos() {
    return [this.state.xPos, this.state.yPos];
  }

  getHeight() {
    return this.state.length;
  }

  getImage() {
    return this.state.image;
  }

  getId() {
    return this.state.id;
  }

  isObselete() {
    if (this.state.xPos + this.getHeight() < 0) {
      return true;
    } else {
      return false;
    }
  }
}

export default Brick;
