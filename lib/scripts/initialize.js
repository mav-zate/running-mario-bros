import Mario from './mario';
import BrickGenerator from './brick_generator';
import GoombaGenerator from './goomba_generator';
import Goomba from './goomba';

const initializeSuite = (context, marioContext) => {
  let objects = {};

  objects.theme = new Audio('https://s3.amazonaws.com/running-mario-bros-dev/env/Super+Mario+Bros+(NES)+Music+-+Overworld+Theme.mp3');
  objects.marioDeath = new Audio('https://s3.amazonaws.com/running-mario-bros-dev/mario/Mario+Death+Sound+Effect.mp3');
  objects.mario = new Mario(marioContext, objects.theme, objects.marioDeath);
  objects.BrickGenerator = new BrickGenerator(context);
  objects.GoombaGenerator = new GoombaGenerator(context, objects.mario);


  return objects;
};

export default initializeSuite;
