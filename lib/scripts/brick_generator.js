import Brick from './brick';

const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 800;
const BRICK_LENGTH = 40;


class BrickGenerator {
  constructor(context) {
    this.state = {
      bricks: [],
      brickId: 1,
    };
    this.context = context;
    this.getBricks = this.getBricks.bind(this);
    this.render = this.render.bind(this);
    this.reset = this.reset.bind(this);

    this.initialize();
  }

  initialize() {
    for (let y = 0; y < 2; y++) {
      for (let x = 0; x < 20; x++) {
        let brick = new Brick(this.context, this.state.brickId);
        this.state.brickId++;
        brick.setPos(x * BRICK_LENGTH, CANVAS_HEIGHT - ((y + 1) * BRICK_LENGTH));
        this.state.bricks.push(brick);
      }
    }
  }

  render() {
    this.context.clearRect(0, CANVAS_HEIGHT - (2 * BRICK_LENGTH),
    CANVAS_WIDTH, (2 * BRICK_LENGTH));


    this.state.bricks.forEach((brick) => {
      const pos = brick.getPos();
      this.context.drawImage(brick.getImage(),
        pos[0], pos[1], BRICK_LENGTH, BRICK_LENGTH
      );
    });
  }

  getBricks() {
    return this.state.bricks;
  }

  reset() {
    this.state.bricks = [];
    this.state.brickId = 1;
    this.initialize();
  }
}


export default BrickGenerator;
