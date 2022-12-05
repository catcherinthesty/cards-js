const Cards = require('./src/cards.js');
const deck = Cards.tarotDeck;
const Hand = Cards.Hand;
c=console.log
deck.shuffle()
hand1=new Hand(deck)
hand2=new Hand(deck)
hand1.cards=deck.dealHand(5);
hand2.cards=deck.dealHand(5);
c(hand1.cards[0].name + ", " + hand1.cards[1].name + ", " + hand1.cards[2].name + ", "
	+ hand1.cards[3].name + ", " + hand1.cards[4].name)
c(hand2.cards[0].name + ", " + hand2.cards[1].name + ", " + hand2.cards[2].name + ", "
	+ hand2.cards[3].name + ", " + hand2.cards[4].name)
hand1.discardCard(0)
hand1.discardCard(0)
hand1.discardCard(0)
hand1.discardCard(0)
//c(hand1.cards)
c(deck.discard.length);