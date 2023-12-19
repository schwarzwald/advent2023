module.exports = input => {
  let instr = input.split(/\r?\n/)
    .map(r => r.match(/(\w) (\d+)/))
    .map(([_, d, c]) => [d, Number(c)]);

  let [x, y] = [0, 0];

  let area = 0;

  for (let [dir, count] of instr) {
    let dx, dy;
    switch (dir) {
      case 'R': [dx, dy] = [count, 0]; break;
      case 'L': [dx, dy] = [-count, 0]; break;
      case 'U': [dx, dy] = [0, -count]; break;
      case 'D': [dx, dy] = [0, count]; break;
    }

    let [nx, ny] = [x + dx, y + dy];

    area += (x * ny - nx * y) + count;

    x = nx;
    y = ny;
  }

  return area / 2 + 1;
}
