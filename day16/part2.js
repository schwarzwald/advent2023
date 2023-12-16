function count(grid, start) {
  let energized = new Set();
  let visited = new Set();
  let queue = [start];

  while (queue.length) {
    let [x, y, dx, dy] = queue.shift();

    if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) {
      continue;
    }

    let key = `${x}#${y}#${dx}#${dy}`;

    if (visited.has(key)) {
      continue;
    }

    energized.add(`${x}#${y}`);
    visited.add(key);

    let value = grid[y][x];
    if (value == '.') {
      queue.push([x + dx, y + dy, dx, dy]);
    } else if (value == '|') {
      if (dx == 0) {
        queue.push([x + dx, y + dy, dx, dy]);
      } else {
        queue.push([x, y - 1, 0, -1], [x, y + 1, 0, 1]);
      }
    } else if (value == '-') {
      if (dy == 0) {
        queue.push([x + dx, y + dy, dx, dy]);
      } else {
        queue.push([x - 1, y, -1, 0], [x + 1, y, 1, 0]);
      }
    } else if (value == '/') {
      queue.push([x - dy, y - dx, -dy, -dx]);
    } else if (value == '\\') {
      queue.push([x + dy, y + dx, dy, dx]);
    }
  }

  return energized.size;
}

module.exports = input => {
  let grid = input.split(/\r?\n/);
  let starts = [];

  for (let i = 0; i < grid.length; i++) {
    starts.push([0, i, 1, 0]);
    starts.push([grid[0].length - 1, i, -1, 0]);
  }

  for (let i = 0; i < grid[0].length; i++) {
    starts.push([i, 0, 0, 1]);
    starts.push([grid[0].length - 1, i, -1, 0]);
  }

  return Math.max(...starts.map(s => count(grid, s)));
}
