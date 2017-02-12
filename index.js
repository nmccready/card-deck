const Emitter = require('events');
const game = new Emitter();
const states = require('./src/games/shuffle')(game);


process.nextTick(() => game.emit('state', 'start'));

game.on('state', onState);
game.on('error', onError);
game.once('close', onEnd);
game.once('end', onEnd);


function onEnd(err){
  if(err){
    console.log('Ending Game, due to unhandled error.');
    console.error(err);
    process.exit(200);
  }
  console.log('Ending Game, goodbye!');
  process.exit(0);
}

function onError(err){
  if (!err) return;
  game.emit('end', err);
}

function onState(state){
  const s = states[state.name] || states.default;
  s(state);
}
