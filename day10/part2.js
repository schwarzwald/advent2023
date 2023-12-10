const getId = (x, y) => `${x}#${y}`;

function traverse(grid, start, startDir, callback) {
  let queue = [start];
  let visited = new Set();
  let dir = startDir;
  let rotation = 0;

  while (queue.length) {
    let [x, y] = queue.shift();
    let id = getId(x, y);

    if (visited.has(id)) {
      continue;
    }

    visited.add(id);
    callback(x, y, dir);

    let current = grid[y][x];

    if (current == 'L' || current == '7') {
      rotation += dir[0] ? -1 : 1;
      dir = [dir[1], dir[0]];
    } else if (current == 'J' || current == 'F') {
      rotation += dir[0] ? 1 : -1;
      dir = [-dir[1], -dir[0]];
    }

    queue.push([x + dir[0], y + dir[1]]);
  }

  return rotation > 0;
}

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

  let startDir;

  for (let [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
    let next = [startX + dx, startY + dy];

    if (next[0] < 0 || next[0] > grid[startY].length - 1 || next[1] < 0 || next[1] > grid.length - 1) {
      continue;
    }

    let neighbour = grid[next[1]][next[0]];
    if (dx == -1 && ['L', '-', 'F'].includes(neighbour)) {
      startDir = [-1, 0];
    } else if (dx == 1 && ['7', '-', 'J'].includes(neighbour)) {
      startDir = [1, 0];
    } else if (dy == -1 && ['7', '|', 'F'].includes(neighbour)) {
      startDir = [0, -1];
    } else if (dy == 1 && ['L', '|', 'J'].includes(neighbour)) {
      startDir = [0, 1];
    }
  }

  let loop = new Set();
  let leftWise = traverse(grid, [startX, startY], startDir, (x, y) => loop.add(getId(x, y)));

  let filled = new Set();

  traverse(grid, [startX, startY], startDir, (x, y, dir) => {
    let pipe = grid[y][x];
    let queue = [];

    if (dir[0] == 1) {
      queue.push(leftWise ? [x, y - 1] : [x, y + 1]);
      if (pipe == 'J' && !leftWise) {
        queue.push([x + 1, y]);
      } else if (pipe == '7' && leftWise) {
        queue.push([x + 1, y]);
      }
    } else if (dir[0] == -1) {
      queue.push(leftWise ? [x, y + 1] : [x, y - 1]);
      if (pipe == 'L' && leftWise) {
        queue.push([x - 1, y]);
      } else if (pipe == 'F' && !leftWise) {
        queue.push([x - 1, y]);
      }
    } else if (dir[1] == 1) {
      queue.push(leftWise ? [x + 1, y] : [x - 1, y]);
      if (pipe == 'J' && leftWise) {
        queue.push([x, y + 1]);
      } else if (pipe == 'L' && !leftWise) {
        queue.push([x, y + 1]);
      }
    } else {
      queue.push(leftWise ? [x - 1, y] : [x + 1, y]);
      if (pipe == '7' && !leftWise) {
        queue.push([x, y - 1]);
      } else if (pipe == 'F' && leftWise) {
        queue.push([x, y - 1]);
      }
    }

    while (queue.length) {
      let current = queue.shift();
      let id = getId(...current);

      if (current[0] < 0 || current[1] >= grid[0].length || current[1] < 0 || current[1] >= grid.length
        || loop.has(id) || filled.has(id)) {
        continue;
      }

      filled.add(id);

      for (let [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
        queue.push([current[0] + dx, current[1] + dy]);
      }
    }
  });

  return filled.size;
}
