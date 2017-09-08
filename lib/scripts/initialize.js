import Mario from './mario';
import BrickGenerator from './brick_generator';
import Goomba from './goomba';

const initializeSuite = (context) => {
  let objects = {};

  objects.mario = new Mario(context);
  objects.BrickGenerator = new BrickGenerator(context);
  objects.goomba = new Goomba(context);

  return objects;
};

export default initializeSuite;
