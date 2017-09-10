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
      deathImages: [],
    };
    this.context = context;

    this.render = this.render.bind(this);
    this.setPos = this.setPos.bind(this);
    this.setSpeed = this.setSpeed.bind(this);
    this.getHeight = this.getHeight.bind(this);
    this.getId = this.getId.bind(this);
    this.getSpeed = this.getSpeed.bind(this);
    this.prepareDeathImages();
    this.initialize();
  }

  prepareDeathImages() {
    for (let i = 0; i < 16; i++) {
      let image = new Image();
      this.state.deathImages.push(image);
    }
  }

  initialize() {
    this.state.images[0].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/goomba/goomba_left.png";
    this.state.images[1].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/goomba/goomba_right.png";
    this.state.deathImages[0].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_1.png";
    this.state.deathImages[1].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_2.png";
    this.state.deathImages[2].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_3.png";
    this.state.deathImages[3].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_4.png";
    this.state.deathImages[4].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_5.png";
    this.state.deathImages[5].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_6.png";
    this.state.deathImages[6].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_7.png";
    this.state.deathImages[7].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_8.png";
    this.state.deathImages[8].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_9.png";
    this.state.deathImages[9].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_10.png";
    this.state.deathImages[10].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_11.png";
    this.state.deathImages[11].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_12.png";
    this.state.deathImages[12].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_13.png";
    this.state.deathImages[13].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_14.png";
    this.state.deathImages[14].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_15.png";
    this.state.deathImages[15].src = "https://s3.amazonaws.com/running-mario-bros-dev/enemies/explosion/explosion_16.png";
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
    } else {

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
