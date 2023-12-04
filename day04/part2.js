module.exports = input => {
  let cards = input.split(/\r?\n/)
    .map(r => r.split(': ')[1].split(' | '))
    .map(([w, c]) => [
      w.split(' ').filter(s => s != '').map(Number),
      c.split(' ').filter(s => s != '').map(Number)
    ])
    .map(([w, c]) => c.filter(x => w.includes(x)).length);

  let history = new Array(cards.length);
  let total = 0;

  for (let i = cards.length - 1; i >= 0; i--) {
    let wins = cards[i];
    let calls = 1;
    for (let j = 1; j <= wins; j++) {
      calls += history[i + j];
    }
    history[i] = calls;
    total += calls;
  }

  return total;
}
