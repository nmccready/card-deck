const Deck = require('../deck');

/*
This game is merley a shuffle interface to create and shuffle decks.
*/

function states(game){

  function def(state){
    start(state);
  }

  function onError({error, state}){
    game.error('error', {error, state});
  }

  function start(state){
    console.log('Would you like a deck of cards (Y/N) ?');

    process.stdin
    .once('data', yesNo)
    .once('error', _onError);

    function _onError(error){
      onError({error, state});
    }

    function yesNo(inData){
      if(!/yes|y/i.test(inData)){
        return game.emit('end');
      }
      console.log('Cool new game!');
      process.stdin.removeListener('error',_onError);
      game.emit('state', {name: 'play', move: "newGame"});
    }
  }

  function whereTo(state){

    console.log(`
    1. Shuffle
    2. New Game
    3. End Game
    `);

    process.stdin
    .once('data', input)
    .once('error', _onError);

    function _onError(error){
      onError({error, state});
    }

    function input(inData){
      inData = Number(inData);
      console.log('You entered: ' + inData);

      if(inData == 1){
        return game.emit('state', {name: 'play', move: "shuffle", deck: state.deck});
      }
      if(inData == 2){
        return game.emit('state', {name: 'play', move: "newGame"});
      }
      if(inData == 3){
        return game.emit('end');
      }

      console.log('Bad Answer: ', inData);
      game.emit('state', state);//recurse, kinda
      process.stdin.removeListener('error',_onError);
    }
  }

  function play({name, move, deck}){
    let moves = {
      "default": newGame,
      newGame: newGame,
      shuffle: shuffle
    };

    (moves[move] || moves.default)({name, move, deck});

    function showDeck(deck){
      console.log('Showing deck');
      console.log(deck.toString());
    }

    function newGame() {
      console.log('Creating Deck');
      const deck = new Deck();
      console.log('Deck created');
      showDeck(deck);
      game.emit('state', {name: 'whereTo', deck});
    }

    function shuffle({name, deck}) {
      console.log('Shuffling Deck');
      deck.shuffle();
      showDeck(deck);
      game.emit('state', {name: 'whereTo', deck});
    }

  }

  return {
    "default": def,
    start,
    play,
    whereTo
  };
}

module.exports = states;
