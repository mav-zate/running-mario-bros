import Brick from './brick';

const CANVAS_HEIGHT = 500;
const CANVAS_WIDTH = 800;
const BRICK_LENGTH = 40;


class BrickGenerator {
  constructor(context, mario) {
    this.state = {
      bricks: [],
      brickId: 1,
      mario: mario,
    };
    this.context = context;
    this.getBricks = this.getBricks.bind(this);
    this.render = this.render.bind(this);
    this.reset = this.reset.bind(this);
    this.generateBrick = this.generateBrick.bind(this);
    this.removeBricks = this.removeBricks.bind(this);

    this.initialize();
  }

  initialize() {
    for (let x = 0; x < 22; x++) {
      for (let y = 0; y < 2; y++) {
        let brick = new Brick(this.context, this.state.brickId);
        this.state.brickId++;
        brick.setPos(x * BRICK_LENGTH, CANVAS_HEIGHT - ((y + 1) * BRICK_LENGTH));
        this.state.bricks.push(brick);
        this.state.mario.receiveOthers(brick);
      }
    }
  }

  render() {
    this.state.bricks.forEach((brick) => {
      brick.render();
    });

    if (this.state.bricks[0].isObselete()) {
      this.removeBricks();
      this.generateBrick(CANVAS_WIDTH, CANVAS_HEIGHT - (BRICK_LENGTH * 1));
      this.generateBrick(CANVAS_WIDTH, CANVAS_HEIGHT - (BRICK_LENGTH * 2));
    }
  }

  getBricks() {
    return this.state.bricks;
  }

  reset() {
    this.state.bricks = [];
    this.state.brickId = 1;
    this.initialize();
  }

  generateBrick(x, y) {
    let brick = new Brick(this.context, this.brickId);
    this.brickId++;
    brick.setPos(x, y);
    this.state.bricks.push(brick);
    this.state.mario.receiveOthers(brick);
  }

  removeBricks() {
    this.state.bricks.shift();
    this.state.bricks.shift();
  }
}


export default BrickGenerator;
