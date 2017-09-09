import Goomba from './goomba';


const GOOMBA_HEIGHT = 40;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 500;

class GoombaGenerator {
  constructor(context, mario) {
    this.state = {
      goombas: [],
      intervals: [500, 750, 1000, 1250, 1500, 1750, 2000],
      mario: mario,
    };
    this.context = context;
    this.getGoombas = this.getGoombas.bind(this);
    this.render = this.render.bind(this);
    this.generateGoomba = this.generateGoomba.bind(this);
    this.runGenerator = this.runGenerator.bind(this);


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
  }

  getGoombas() {
    return this.state.goombas;
  }

  generateGoomba() {
    let goomba = new Goomba(this.context);
    this.state.goombas.push(goomba);
    this.state.mario.receiveOthers([goomba]);
  }


}


export default GoombaGenerator;
