const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 800;
const BRICK_LENGTH = 40;


class Brick {
  constructor(context) {
    this.state = {
      image: new Image(),
      xPos: -1,
      yPos: -1,
    };
    this.context = context;

    this.initialize();
    this.setPos = this.setPos.bind(this);
    this.getImage = this.getImage.bind(this);
    this.getPos = this.getPos.bind(this);
  }

  initialize() {
    this.state.image.src =
      "https://s3.amazonaws.com/running-mario-bros-dev/env/8bit_brick.png";
  }

  setPos(x, y) {
    this.state.xPos = x;
    this.state.yPos = y;
  }

  getPos() {
    return [this.state.xPos, this.state.yPos];
  }

  getImage() {
    return this.state.image;
  }
}

export default Brick;
