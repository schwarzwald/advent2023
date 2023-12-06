module.exports = input => {
  let [t, d] = input.split(/\r?\n/)
    .map(r => r.split(': ')[1])
    .map(r => r.replaceAll(' ', ''))
    .map(Number);

  let dsc = Math.sqrt(t * t - 4 * d);
  let x1 = Math.floor(1 + ((t - dsc) / 2));
  let x2 = Math.ceil(((t + dsc) / 2) - 1);

  return x2 - x1 + 1;
}
