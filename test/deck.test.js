const Deck = require('../src/deck');
const test = require('tape');
const _ = require('lodash');

test('deck: correct amount of cards', (t) => {
  let deckLen = 54;
  t.equal((new Deck()).cards.length, deckLen, 'with joker');
  t.equal((new Deck({jokers:0})).cards.length, deckLen - 2, 'w/o joker');

  t.equal(
    _(new Deck().cards)
    .map('rank')
    .filter((x) => !isNaN(x))
    .value().length,
    36, 'numbers'
  );

  t.equal(
    _(new Deck().cards)
    .map('rank')
    .filter((x) => isNaN(x))
    .value().length,
    deckLen - 36, 'face w joker'
  );

  t.equal(
    _(new Deck({jokers:0}).cards)
    .map('rank')
    .filter((x) => isNaN(x))
    .value().length,
    (deckLen - 36) - 2, 'face w/o joker'
  );
  t.end();
});
