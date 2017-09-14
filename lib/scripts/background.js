const BACKGROUND_WIDTH = 2400;
const BACKGROUND_HEIGHT = 420;
const SPEED = 1;


class Background {
  constructor(context) {
    this.context = context;
    this.image = new Image();
    this.oldLeft = -1;
    this.left = -1;
    this.top = -1;
    this.right = -1;
    this.speed = SPEED;

    // bindings
    this.setPos = this.setPos.bind(this);
    this.isObselete = this.isObselete.bind(this);
    this.getEndPos = this.getEndPos.bind(this);

    this.initialize();
  }

  initialize() {
    this.image.src = "https://s3.amazonaws.com/running-mario-bros-dev/background/super_mario_background.png";
  }

  render() {
    // clear old image
    if (this.oldLeft !== -1) {
      this.context.clearRect(this.oldLeft, this.top,
        BACKGROUND_WIDTH, BACKGROUND_HEIGHT);
    }
    // move background
    this.oldLeft = this.left;
    this.left -= this.speed;
    this.right -= this.speed;
    // draw
    this.context.drawImage(this.image,
      this.left, this.top, BACKGROUND_WIDTH, BACKGROUND_HEIGHT);
  }

  setPos(x, y) {
    this.left = x;
    this.top = y;
    this.right = x + BACKGROUND_WIDTH;
    this.bottom = y + BACKGROUND_HEIGHT;
  }

  isObselete() {
    if (this.right < 0) {
      return true;
    } else {
      return false;
    }
  }

  getEndPos() {
    return this.right;
  }
}

export default Background;
