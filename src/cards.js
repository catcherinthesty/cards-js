/**
 * The Deck class is a container for cards.
 * deck.playing contains an ordered list of cards, each of which is an object
 * with arbitrary properties, none of which need to be unique.
 * deck.fullDeck contains the initial state of the deck, and can be used to
 * restore the deck to its original state, or for comparison purposes
 * deck.discard is an empty ordered array containing cards that have been placed
 * therein, which, by default, are stacked on the top.
 **/
class Deck {
	/**
	 * The constructor function takes a factory as its input, allowing for nearly
	 * any kind of card to be created. The function should return an ordered
	 * array containing the cards.
	 * Cards need no properties to work within the context of a deck. In theory,
	 * a card could function even if it was an empty object.
	 * In practice, a card should have all obvious and derived properties present.
	 **/
	constructor(factory) {
		this.fullDeck = factory();
		this.playing = this.fullDeck.map((x)=>x);
		this.discard = [];
	}
	/**
	 * Refreshes the entire deck. If true is passed as an argument, also shuffles.
	 * Optionally shuffles or clears discard (true in the second paramter)
	 * @param shuffle(bool) determines if there should be shuffling after the restore
	 * @param clearDiscard(bool) determines if the discard should be emptied.
	 **/
	refreshFull(shuffle=false,clearDiscard=false) {
		this.playing = this.fullDeck.map((x)=>x);
		if(clearDiscard) { this.discard = [] }
		if(shuffle) { this.shuffle() }
	}
	/**
	 * returns the discard to the end of the deck. If true is passed, also shuffles.
	 * @param shuffle(bool) determines if there should be shuffling after combining
	 **/
	refreshDiscard(shuffle=false) {
		this.playing=this.playing.concat(this.discard);
		this.discard=[]
		if(shuffle) { this.shuffle() }
	}
	/**
	 * Shuffles the deck. Accepts no parameters.
	 **/
	shuffle() {
			let i = this.playing.length;
		while (--i > 0) {
  			let randIndex = Math.floor(Math.random() * (i + 1));
  			[this.playing[randIndex], this.playing[i]] = [this.playing[i], this.playing[randIndex]];
		}
	}
	/**
	 * Dealing a card returns the card at a given position, defaulting to 0 (top of deck)
	 **/
	dealCard(pos=0) {
		return this.playing.splice(pos,1)[0];
	}
	drawCard = this.dealCard; /* Technically, a deck DEALS cards, a hand DRAWS cards
	Nonetheless, I'm including this alias to avoid confusion later. */
	/**
	 * Moves a given card to the top of the deck.
	 **/
	topdeckCard(pos=0) {
		this.playing.unshift(this.playing.splice(pos,1)[0])
	}
	/**
	 * Moves a given card to the bottom of the deck.
	 */
	bottomdeckCard(pos=0) {
		this.playing.push(this.playing.splice(pos,1)[0])
	}
	/**
	 * For dealing a specific number of cards.
	 * @param num (Integer) the number of cards to deal
	 * @return (Array) an array of num cards all taken from the top of the deck
	 **/
	dealHand(num) {
		var retVal=[];
		for(let n=0; n<num; n++) {
			retVal.push(this.dealCard());
		}
		return retVal;
	}
	/**
	 * Peeks at the card at the indicated position, defaulting to 0
	 **/
	peekCard(pos=0) {
		return this.playing[pos];
	}
}

class Hand {
	/**
	 * @param originDeck(Deck obj) The deck from which this hand draws
	 * and to whose discard it discards.
	 **/
	constructor(originDeck) {
		this.cards = [];
		this.discardDeck = originDeck.discard;
		this.originDeck = originDeck;
	}
	/**
	 * @param pos(int) The position in hand of the card to discard.
	 **/
	discardCard = function(pos=0){
		this.discardDeck.unshift(this.cards.splice(pos,1)[0]);
	}
	drawCard = function(pos=0){
		this.cards.push(this.originDeck.drawCard.call(this.originDeck,pos))
	}
}

/**
 * An example factory for a French-suited deck, suitable for poker.
 * Accepts an argument for inclusion of Jokers.
 **/
const FRENCH_SUITS = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
const FRENCH_RANKS = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven',
					  'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'];
const FRENCH_RANK_VALUES = [14,2,3,4,5,6,7,8,9,10,11,12,13];
const TRUE_RANK_VALUES = [1,2,3,4,5,6,7,8,9,10,11,12,13];
const JOKERS = ['Red Joker', 'Black Joker'];
const FRENCH_CARD_NAME = function() {
	if(arguments.length==2) {
		return ("The " + arguments[0] + " of " + arguments[1])
	} else {
		return arguments[0]
	}
}
const FRENCH_DECK_FACTORY = function(jokers=true) {
	var deck = [];
	for(s in FRENCH_SUITS) {
		var suit = FRENCH_SUITS[s];
		for(r in FRENCH_RANKS) {
			var rank = FRENCH_RANKS[r];
			var value = FRENCH_RANK_VALUES[r];
			deck.push({	suit: suit,
						rank: rank,
						value: value,
						name: FRENCH_CARD_NAME(rank,suit)});
		}
	}
	if(jokers) {
		for(j in JOKERS) {
			deck.push({ suit: null, rank: null, value: null, name: FRENCH_CARD_NAME(JOKERS[j])})
		}
	}
	return deck
}

/**
 * An example factory for a tarot deck, suitable to produce a standard
 * Rider-Waite-Smith tarot deck (Strength in the 08 position of the MA).
 */
const TAROT_SUITS = ['Swords', 'Wands', 'Pentacles', 'Cups'];
const TAROT_RANKS = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven',
	                 'Eight', 'Nine', 'Ten', 'Page', 'Knight', 'Queen', 'King'];
const TAROT_RANK_VALUES = [1,2,3,4,5,6,7,8,9,10,11,12,13,14]
const TAROT_MAJOR = ['00 - The Fool', '01 - The Magician', '02 - The High Priestess', '03 - The Empress',
					 '04 - The Emperor', '05 - The Hierophant', '06 - The Lovers', '07 - The Chariot',
					 '08 - Strength', '09 - The Hermit', '10 - The Wheel of Fortune', '11 - Justice',
					 '12 - The Hanged Man', '13 - Death', '14 - Temperance', '15 - The Devil',
					 '16 - The Tower', '17 - The Star', '18 - The Moon', '19 - The Sun',
					 '20 - Judgement', '21 - The World'];
const TAROT_MAJOR_VALUES = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]
const TAROT_CARD_NAME = function() {
	if(arguments.length==2) {
		return ("The " + arguments[0] + " of " + arguments[1])
	} else {
		return arguments[0]
	}
}
const TAROT_DECK_FACTORY = function() {
	var deck = [];
	for(s in TAROT_SUITS) {
		var suit = TAROT_SUITS[s];
		for(r in TAROT_RANKS) {
			var rank = TAROT_RANKS[r];
			var value = TAROT_RANK_VALUES[r];
			deck.push({	suit: suit,
						rank: rank,
						value: value,
						name: TAROT_CARD_NAME(rank, suit)});
		}
	}
	for(a in TAROT_MAJOR) {
		deck.push({
			rank: TAROT_MAJOR_VALUES[a] > 9
			? TAROT_MAJOR_VALUES[a].toString()
			: "0" + TAROT_MAJOR_VALUES[a],
			suit: "Major",
			value: TAROT_MAJOR_VALUES[a],
			name: TAROT_CARD_NAME(TAROT_MAJOR[a])
		});
	}
	return deck;
}

UNO_COLORS=['Red','Yellow','Blue','Green']
UNO_RANKS=[0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9]
UNO_ACTION=['Draw Two','Reverse','Skip']
UNO_WILD=['Wild','Wild Draw Four']
const UNO_DECK_FACTORY = function() {
	var deck = [];

	for(var c in UNO_COLORS) {
		var color = UNO_COLORS[c];
		for(var r in UNO_RANKS) {
			var rank = UNO_RANKS[r];
			deck.push({	color: color,
						rank: rank,
						name: color + " " + rank.toString(),
					});
		}
		for(a in UNO_ACTION) {
			for(let i=0; i<2; i++){
				var action = UNO_ACTION[a]
				deck.push({
					color: color,
					rank: "Action",
					name: color + " " + action,
				});
			}
		}
	}
	for(var w in UNO_WILD) {
		var wild = w;
		for(let i=0; i<4; i++){
			deck.push({
				color: "Wild",
				rank: "action",
				name: wild
			});
		}
	}
	return deck;
}

action=2
wild=4

unoDeck=new Deck(UNO_DECK_FACTORY);
tarotDeck=new Deck(TAROT_DECK_FACTORY);
pokerDeck=new Deck(FRENCH_DECK_FACTORY);
module.exports = { Hand, Deck, tarotDeck, pokerDeck, unoDeck };