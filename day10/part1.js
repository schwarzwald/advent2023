module.exports = input => {
  let grid = input.split(/\r?\n/)
    .map(r => r.split(''));

  let startX = 0;
  let startY = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] == 'S') {
        startX = x;
        startY = y;
        break;
      }
    }
  }

  let dir;

  for (let [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
    let next = [startX + dx, startY + dy];

    if (next[0] < 0 || next[0] > grid[startY].length - 1 || next[1] < 0 || next[1] > grid.length - 1) {
      continue;
    }

    let neighbour = grid[next[1]][next[0]];
    if (dx == -1 && ['L', '-', 'F'].includes(neighbour)) {
      dir = [-1, 0];
    } else if (dx == 1 && ['7', '-', 'J'].includes(neighbour)) {
      dir = [1, 0];
    } else if (dy == -1 && ['7', '|', 'F'].includes(neighbour)) {
      dir = [0, -1];
    } else if (dy == 1 && ['L', '|', 'J'].includes(neighbour)) {
      dir = [0, 1];
    }
  }

  let queue = [[startX, startY]];
  let visited = new Set();

  while (queue.length) {
    let [x, y] = queue.shift();
    let id = `${x}#${y}`;

    if (visited.has(id)) {
      continue;
    }

    visited.add(id);

    let current = grid[y][x];

    if (current == 'L' || current == '7') {
      dir = [dir[1], dir[0]];
    } else if (current == 'J' || current == 'F') {
      dir = [-dir[1], -dir[0]];
    }

    queue.push([x + dir[0], y + dir[1]]);
  }

  return visited.size / 2;
}
