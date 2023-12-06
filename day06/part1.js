module.exports = input => {
  let [times, distances] = input.split(/\r?\n/)
    .map(r => r.split(': ')[1])
    .map(r => r.split(' ')
      .filter(r => r != '')
      .map(Number));

  let result = 1;

  for (let i = 0; i < times.length; i++) {
    let t = times[i];
    let d = distances[i];

    let dsc = Math.sqrt(t * t - 4 * d);
    let x1 = Math.floor(1 + ((t - dsc) / 2));
    let x2 = Math.ceil(((t + dsc) / 2) - 1);

    result *= x2 - x1 + 1;;
  }

  return result;
}
