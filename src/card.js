const deck = require('./deck')

const defaults = {
  "singleFace": false
  // false will use a different image for each suit/face, true will use diamond image for all
};


class Card {

  /**
   * create a playing card
   * @param Object:
   *
   * string rank The numeric or letter value of the card (short value)
   * string rankString The full text representation of the rank (localized)
   * string suit The letter value of the suite (short value)
   * string suitString The full text representation of the suit (localized)
   * obj options Overriding optionsiguration
   *
   */
  constructor({
    rank,
    rankString,
    suit,
    suitString,
    options
  } = {}) {
    if (!(this instanceof Card)) {
      return new Card(rank, rankString, suit, suitString, options);
    }

    this.options = Object.assign({}, Card.defaults, options);

    if (!suit) {
      suit = rankString;
      rankString = deck.defaults.ranks[rank];
      suitString = deck.defaults.suits[suit];
    }

    this.rank = rank;
    this.rankString = rankString;
    this.suit = suit;
    this.suitString = suitString;
  }
  /**
   * get the text representation of the card
   */
  toString() {
    return JSON.stringify(this);
  }
}

Card.defaults = defaults;

module.exports = Card;
