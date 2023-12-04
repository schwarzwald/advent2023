module.exports = input => {
  let cards = input.split(/\r?\n/)
    .map(r => r.split(': ')[1].split(' | '))
    .map(([w, c]) => [
      w.split(/\s+/).filter(s => s.trim() != '').map(Number),
      c.split(/\s+/).filter(s => s.trim() != '').map(Number)
    ])
    .map(([w, c]) => c.filter(x => w.includes(x)).length);

  let history = [];
  let total = 0;

  for (let i = cards.length - 1; i >= 0; i--) {
    let wins = cards[i];
    let calls = 1;
    for (let j = 0; j < wins; j++) {
      calls += history[cards.length - i - j - 2];
    }
    history.push(calls);
    total += calls;
  }

  return total;
}
