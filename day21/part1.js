module.exports = (input, steps = 64) => {
  let grid = input.split(/\r?\n/)
    .map(r => r.split(''));

  let [sx, sy] = [0, 0];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] == 'S') {
        sx = x;
        sy = y;
        break;
      }
    }
  }

  let parity = steps % 2;
  let queue = [[sx, sy, steps]];
  let count = 0;

  let visited = new Set();
  while (queue.length) {
    let [x, y, remaining] = queue.shift();
    let key = `${x}#${y}`;

    if (visited.has(key)) {
      continue;
    }

    visited.add(key);

    if (remaining % 2 == parity) {
      count++;
    }

    if (remaining > 0) {
      for (let [dx, dy] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
        if (x + dx >= 0 && x + dx < grid[0].length && y + dy >= 0 && y + dy < grid.length) {
          if (grid[y + dy][x + dx] != '#') {
            queue.push([x + dx, y + dy, remaining - 1]);
          }
        }
      }
    }
  }

  return count;
}
