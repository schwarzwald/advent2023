module.exports = input =>
  input.split(/\r?\n/)
    .map(s => [...s])
    .map(s => s.filter(x => !isNaN(x)))
    .map(s => Number(s[0] + s[s.length - 1]))
    .reduce((a, b) => a + b);
