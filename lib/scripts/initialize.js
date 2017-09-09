import Mario from './mario';
import BrickGenerator from './brick_generator';
import GoombaGenerator from './goomba_generator';
import Goomba from './goomba';

const initializeSuite = (context) => {
  let objects = {};

  objects.mario = new Mario(context);
  objects.BrickGenerator = new BrickGenerator(context);
  objects.GoombaGenerator = new GoombaGenerator(context, objects.mario);

  return objects;
};

export default initializeSuite;
