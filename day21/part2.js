function findReachable(grid, sx, sy) {
  let queue = [[sx, sy]];

  let visited = new Set();
  while (queue.length) {
    let [x, y] = queue.shift();
    let key = `${x}#${y}`;

    if (visited.has(key)) {
      continue;
    }

    visited.add(key);

    for (let [dx, dy] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
      if (x + dx >= 0 && x + dx < grid[0].length && y + dy >= 0 && y + dy < grid.length) {
        if (grid[y + dy][x + dx] != '#') {
          queue.push([x + dx, y + dy]);
        }
      }
    }
  }

  return visited;
}

module.exports = (input, steps = 26501365) => {
  let grid = input.split(/\r?\n/)
    .map(r => r.split(''));

  let [sx, sy] = [0, 0];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] == 'S') {
        sx = x;
        sy = y;
      }
    }
  }

  let reachable = findReachable(grid, sx, sy);
  const isReachable = (x, y) => grid[y][x] != '#' && reachable.has(`${x}#${y}`);

  let size = grid.length;
  let radius = (grid.length - 1) / 2;

  let center = [0, 0];
  let topRight = [0, 0];
  let topLeft = [0, 0];
  let bottomRight = [0, 0];
  let bottomLeft = [0, 0];

  for (let dy = -radius; dy <= radius; dy++) {
    let lx = radius - Math.abs(dy);
    for (let dx = -lx; dx <= lx; dx++) {
      if (isReachable(sx + dx, sy + dy)) {
        center[(Math.abs(dy) + Math.abs(dx)) % 2]++;
      }
    }
  }

  for (let dy = -radius; dy <= -1; dy++) {
    for (let dx = 1 + (radius - Math.abs(dy)); dx <= radius; dx++) {
      if (isReachable(sx + dx, sy + dy)) {
        topRight[(Math.abs(dy) + Math.abs(dx)) % 2]++;
      }
      if (isReachable(sx - dx, sy + dy)) {
        topLeft[(Math.abs(dy) + Math.abs(dx)) % 2]++;
      }
      if (isReachable(sx + dx, sy - dy)) {
        bottomRight[(Math.abs(dy) + Math.abs(dx)) % 2]++;
      }
      if (isReachable(sx - dx, sy - dy)) {
        bottomLeft[(Math.abs(dy) + Math.abs(dx)) % 2]++;
      }
    }
  }

  let complements = [
    topRight[0] + bottomLeft[0] + topLeft[1] + bottomRight[1],
    topRight[1] + bottomLeft[1] + topLeft[0] + bottomRight[0]];

  let repetitions = Math.floor(steps / size);
  let total = 0;

  total += center[1] * ((repetitions + 1) ** 2);
  total += center[0] * (repetitions ** 2);

  total += complements[1] * (repetitions + 1) * repetitions;
  total += complements[0] * (repetitions + 1) * repetitions;

  return total;
}
