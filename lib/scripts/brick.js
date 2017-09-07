const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 800;
const BRICK_LENGTH = 40;


class Brick {
  constructor(context) {
    this.state = {
      image: new Image(),
    };
    this.context = context;

    this.initialize();
    this.render = this.render.bind(this);
  }

  initialize() {
    this.state.image.src =
      "https://s3.amazonaws.com/running-mario-bros-dev/env/8bit_brick.png";
  }

  render() {
    this.context.clearRect(0, CANVAS_HEIGHT - (2 * BRICK_LENGTH),
    CANVAS_WIDTH, (2 * BRICK_LENGTH));


    for (let y = 0; y < 2; y++) {
      for (let x = 0; x < 20; x++) {
        this.context.drawImage(this.state.image,
          x * BRICK_LENGTH, CANVAS_HEIGHT - (2 * BRICK_LENGTH) + (y * BRICK_LENGTH),
          BRICK_LENGTH, BRICK_LENGTH);
      }
    }
  }
}

export default Brick;
