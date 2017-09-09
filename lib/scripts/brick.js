const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 800;
const BRICK_LENGTH = 40;


class Brick {
  constructor(context, id) {
    this.state = {
      image: new Image(),
      xPos: -1,
      yPos: -1,
      height: BRICK_LENGTH,
      id: id,
    };
    this.context = context;

    this.initialize();
    this.setPos = this.setPos.bind(this);
    this.getImage = this.getImage.bind(this);
    this.getPos = this.getPos.bind(this);
    this.getId = this.getId.bind(this);
    this.getHeight = this.getHeight.bind(this);
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

  getHeight() {
    return this.state.height;
  }

  getImage() {
    return this.state.image;
  }

  getId() {
    return this.state.id;
  }
}

export default Brick;
