const utils = require('./utils');
const defaults = {
  "shuffleTimes": 7,
  "decks": 1,

  "startShuffled": true,
  "jokers": 2,
  "jokerText": "Joker",
  "ranks": {
    "2": "Two",
    "3": "Three",
    "4": "Four",
    "5": "Five",
    "6": "Six",
    "7": "Seven",
    "8": "Eight",
    "9": "Nine",
    "10": "Ten",
    "J": "Jack",
    "Q": "Queen",
    "K": "King",
    "A": "Ace"
  },
  "suits": {
    "S": "Spades",
    "D": "Diamonds",
    "C": "Clubs",
    "H": "Hearts"
  }
};

class Deck {

  constructor(options = {}) {
    var options = Object.assign({}, Deck.defaults, options);//clone

    this.options = options;
    this.init();

    if (this.options.startShuffled) {
      this.shuffle(Deck.defaults.shuffleTimes);
    }

  }

  // build deck
  init() {
    const Card = require('./card'); // lazy require a card

    this.cards = [];
    var o = this.options, s, r, j;
    // populate draw pile
    for (let i = 0; i < o.decks; i++) {
      // standard
      for (s in o.suits) {
        for (r in o.ranks) {
          this.addCard(new Card({
            rank: r,
            rankString: o.ranks[r],
            suit: s,
            suitString: o.suits[s]
          }));
        }
      }
      // jokers
      for (j = 0; j < o.jokers; j++) {
        // suit will always be 1 or 2
        this.addCard(new Card({
          rank: "N",
          rankString: o.jokerText,
          suit: (j % 2) + 1,
          suitString: ''
        }));
      }
    }
  }

  draw(){
    return this.cards.length > 0 ? this.cards.pop() : null;
  }


  addCard(card) {
    this.cards.push(card);
  }

  shuffle(n = defaults.shuffleTimes) {

    var l = this.cards.length,
      r, tmp, i, j;

    for (i = 0; i < n; i++) {
      for (j = 0; j < l; j++) {
        r = Math.floor(Math.random() * l);
        tmp = this.cards[j];
        this.cards[j] = this.cards[r];
        this.cards[r] = tmp;
      }
    }
  }

  orderByRank() {
    this.cards.sort(this.compareRank);
  }

  orderBySuit() {
    this.init();
  }

  // can be overriden based on game rules
  compareRank(a, b) {
    if (a.rank == b.rank) return 0;
    if (a.rank == "N") return 1;
    if (b.rank == "N") return -1;
    if (a.rank == "A") return 1;
    if (b.rank == "A") return -1;
    if (!isNaN(a.rank - b.rank)) return a.rank - b.rank;
    if (a.rank == "K" && b.rank == "J") return 1;
    if (a.rank == "J" && b.rank == "K") return -1;
    if (a.rank == "K" && b.rank == "Q") return 1;
    if (a.rank == "Q" && b.rank == "K") return -1;
    if (a.rank == "Q" && b.rank == "J") return 1;
    if (a.rank == "J" && b.rank == "Q") return -1;
    if (a.rank == "K" && utils.isNumeric(b.rank)) return 1;
    if (a.rank == "Q" && utils.isNumeric(b.rank)) return 1;
    if (a.rank == "J" && utils.isNumeric(b.rank)) return 1;
    if (utils.isNumeric(a.rank) && b.rank == "K") return -1;
    if (utils.isNumeric(a.rank) && b.rank == "Q") return -1;
    if (utils.isNumeric(a.rank) && b.rank == "J") return -1;
  }

  toString(){
    let str = '', comma;
    for(let i in this.cards){
      comma = i == this.cards.length - 1 ? '' : ',';
      str += `Card: ${this.cards[i].toString(['options','suit'])}${comma}\n`;
    }
    return str;
  }
}

Deck.defaults = defaults;

module.exports = Deck;
