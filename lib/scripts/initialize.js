import Mario from './mario';
import Brick from './brick';

const initializeSuite = (context) => {
  let objects = {};

  objects.mario = new Mario(context);
  objects.brick = new Brick(context);


  return objects;
};

export default initializeSuite;
