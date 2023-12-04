module.exports = input =>
  input.split(/\r?\n/)
    .map(r => r.split(': ')[1].split(' | '))
    .map(([w, c]) => [
      w.split(/\s+/).filter(s => s.trim() != '').map(Number),
      c.split(/\s+/).filter(s => s.trim() != '').map(Number)
    ])
    .map(([w, c]) => c.filter(x => w.includes(x)).length)
    .map(c => c ? 2 ** (c - 1) : 0)
    .reduce((a, b) => a + b);