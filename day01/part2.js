const words = [
  'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  '1', '2', '3', '4', '5', '6', '7', '8', '9'
];

module.exports = input =>
  input.split(/\r?\n/)
    .map(s => words.map(w => [w, s.indexOf(w), s.lastIndexOf(w)])
      .filter(w => w[1] >= 0))
    .map(r => [
      r.reduce((w1, w2) => w1[1] < w2[1] ? w1 : w2)[0],
      r.reduce((w1, w2) => w1[2] > w2[2] ? w1 : w2)[0]
    ])
    .map(([min, max]) => [
      (words.indexOf(min) % 9) + 1,
      (words.indexOf(max) % 9) + 1
    ])
    .map(([min, max]) => 10 * min + max)
    .reduce((a, b) => a + b);