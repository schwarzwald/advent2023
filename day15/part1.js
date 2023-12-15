module.exports = input =>
  input.split(',')
    .map(r => r.split('')
      .reduce((sum, a) => ((sum + a.charCodeAt(0)) * 17) % 256, 0))
    .reduce((a, b) => a + b);