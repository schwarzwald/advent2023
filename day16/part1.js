module.exports = input => {
  let grid = input.split(/\r?\n/);
  let energized = new Set();
  let visited = new Set();
  let queue = [[0, 0, 1, 0]];

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
