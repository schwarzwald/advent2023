const types = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];

function secondary(power, hand) {
  return hand.reduce((result, c) => 100 * result + types.indexOf(c), power);
}

function primary(hand) {
  let jokers = hand.filter(c => c == 'J').length;
  hand = hand.filter(c => c != 'J');

  let counted = [];
  let counts = [];

  for (let card of hand) {
    if (counted.includes(card)) {
      continue;
    }

    counts.push(hand.filter(c => c == card).length);
    counted.push(card);
  }

  counts.sort((a, b) => b - a);
  if (counts.length) {
    counts[0] += jokers;
  } else {
    counts.push(jokers);
  }

  if (counts[0] == 5) {
    return 7;
  } else if (counts[0] == 4) {
    return 6;
  } else if (counts[0] == 3 && counts[1] == 2) {
    return 5;
  } else if (counts[0] == 3) {
    return 4;
  } else if (counts[0] == 2 && counts[1] == 2) {
    return 3;
  } else if (counts[0] == 2) {
    return 2;
  } else {
    return 1;
  }
}

function rank(hand) {
  return secondary(primary(hand), hand);
}

module.exports = input =>
  input.split(/\r?\n/)
    .map(r => r.split(' '))
    .map(([cards, bid]) => [cards.split(''), Number(bid)])
    .sort((a, b) => rank(a[0]) - rank(b[0]))
    .map(r => r[1])
    .reduce((result, bid, i) => result + (i + 1) * bid, 0);
