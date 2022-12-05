class Deck {
	constructor(factory) {
		this.fullDeck = factory();
		this.playing = this.fullDeck.map((x)=>x);
		this.discard = [];
	}
	refreshFull(shuffle=false) {
		this.playing = this.fullDeck.map((x)=>x);
		if(shuffle) { this.shuffle() }
	}
	refreshDiscard(shuffle=false) {
		this.playing=this.playing.concat(this.discard);
		if(shuffle) { this.shuffle() }
	}
	shuffle() {
		let i = this.playing.length;
		while (--i > 0) {
  			let randIndex = Math.floor(Math.random() * (i + 1));
  			[this.playing[randIndex], this.playing[i]] = [this.playing[i], this.playing[randIndex]];
		}
	}
	dealCard(pos=0) {
		return this.playing.splice(pos,1)[0];
	}
	drawCard = this.dealCard;
	topdeckCard(pos=0) {
		this.playing.unshift(this.playing.splice(pos,1)[0])
	}
	dealHand(num) {
		var retVal=[];
		for(let n=num; n>0; n--) {
			retVal.push(this.dealCard());
		}
		return retVal;
	}
}

class Hand {
	constructor(originDeck) {
		this.cards = [];
		this.discardDeck = originDeck.discard;
	}
	discardCard = function(pos=0){
		this.discardDeck.unshift(this.cards.splice(pos,1)[0]);
	}
}

const FRENCH_DECK_FACTORY = function() {
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
	for(j in JOKERS) {
		deck.push({ suit: null, rank: null, value: null, name: FRENCH_CARD_NAME(JOKERS[j])})
	}
	return deck
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
tarotDeck=new Deck(TAROT_DECK_FACTORY)
pokerDeck=new Deck(FRENCH_DECK_FACTORY),
module.exports = { Hand, Deck, tarotDeck, pokerDeck };