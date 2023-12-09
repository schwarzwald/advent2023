module.exports = input => {
  let sequences = input.split(/\r?\n/)
    .map(r => r.split(' ').map(Number));

  let sum = 0;

  for (let sequence of sequences) {
    let rows = [sequence];
    while (!rows[rows.length - 1].every(c => c === 0)) {
      let row = [];

      let last = rows[rows.length - 1];
      for (let i = 0; i < last.length - 1; i++) {
        row.push(last[i + 1] - last[i]);
      }
      rows.push(row);
    }

    rows[rows.length - 1].unshift(0);
    for (let i = rows.length - 2; i >= 0; i--) {
      rows[i].unshift(rows[i][0] - rows[i + 1][0]);
    }

    sum += rows[0][0];
  }
  return sum;
}
