import Goomba from './goomba';


const GOOMBA_HEIGHT = 40;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 500;

class GoombaGenerator {
  constructor(context, mario, musicBoolean) {
    this.state = {
      goombas: [],
      intervals: [750, 1500, 2250],
      mario: mario,
      goombaId: 100,
      musicOn: musicBoolean,
    };
    this.context = context;
    this.getGoombas = this.getGoombas.bind(this);
    this.render = this.render.bind(this);
    this.generateGoomba = this.generateGoomba.bind(this);
    this.removeGoomba = this.removeGoomba.bind(this);
    this.runGenerator = this.runGenerator.bind(this);
    this.reset = this.reset.bind(this);

    this.runGenerator();
  }

  runGenerator() {
    let intervals = this.state.intervals;
    let randomIndex = Math.floor(Math.random() * intervals.length);
    let randomTime = intervals[randomIndex];
    window.setTimeout(() => {
      this.generateGoomba();
      this.runGenerator();
    }, randomTime);
  }

  render() {
    this.state.goombas.forEach((goomba) => {
      goomba.render();
    });
    this.removeGoomba();
  }

  getGoombas() {
    return this.state.goombas;
  }

  generateGoomba() {
    let goomba = new Goomba(this.context, this.state.goombaId, this.state.musicOn);
    this.state.goombaId++;
    this.state.goombas.push(goomba);
    this.state.mario.receiveOthers([goomba]);
  }

  removeGoomba() {
    if (this.state.goombas.length === 0) {
      return;
    }

    let firstGoomba = this.state.goombas[0];
    let goombaRightSide = firstGoomba.getPos()[0] + firstGoomba.getHeight();
    // either passed under mario or killed
    if (goombaRightSide < 0) {
      // remove from mario's others and goomba generator
      let goombaId = firstGoomba.getId();
      this.state.goombas.shift();
      this.state.mario.removeOther(goombaId);
    }
  }

  reset() {
    this.state.goombas = [];
    this.goombaId = 100;
  }
}


export default GoombaGenerator;
