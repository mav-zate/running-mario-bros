import Mario from './mario';
import BrickGenerator from './brick_generator';

const initializeSuite = (context) => {
  let objects = {};

  objects.mario = new Mario(context);
  objects.BrickGenerator = new BrickGenerator(context);


  return objects;
};

export default initializeSuite;
