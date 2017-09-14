import Background from './background';



class BackgroundGenerator {
  constructor(context) {
    this.context = context;
    this.backgrounds = [];

    // bindings
    this.render = this.render.bind(this);
    this.recycleBackground = this.recycleBackground.bind(this);
    this.generateBackground = this.generateBackground.bind(this);

    this.initialize();
  }

  initialize() {
    this.generateBackground(0, 0);
    this.generateBackground(2400, 0);
  }

  generateBackground(x, y) {
    let background = new Background(this.context);
    background.setPos(x, y);
    this.backgrounds.push(background);
  }


  render() {
    this.backgrounds.forEach((bg) => {
      bg.render();
    });
    if (this.backgrounds[0].isObselete()) {
      this.recycleBackground();
    }
  }

  recycleBackground() {
    this.backgrounds.shift();
    let current = this.backgrounds[0];
    let endPos = current.getEndPos();
    this.generateBackground(endPos, 0);
  }
}

export default BackgroundGenerator;
