module.exports = input => {
  let instr = input.split(/\r?\n/)
    .map(r => r.match(/\w \d+ \(#([\w\d]+)\)/))
    .map(([_, d]) => [parseInt(d.slice(0, d.length - 1), 16), Number(d[d.length - 1])]);

  let [x, y] = [0, 0];

  let area = 0;

  for (let [count, dir] of instr) {
    let dx, dy;
    switch (dir) {
      case 0: [dx, dy] = [count, 0]; break;
      case 1: [dx, dy] = [0, count]; break;
      case 2: [dx, dy] = [-count, 0]; break;
      case 3: [dx, dy] = [0, -count]; break;
    }

    let [nx, ny] = [x + dx, y + dy];

    area += (x * ny - nx * y) + count;

    x = nx;
    y = ny;
  }

  return area / 2 + 1;
}
