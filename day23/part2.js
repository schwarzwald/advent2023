const getKey = (x, y) => `${x}#${y}`;

function build(grid) {
  let queue = [[1, 0, getKey(1, 0), null, 0]];
  let goal = [grid[0].length - 2, grid.length - 1]

  let nodes = new Map();
  nodes.set(getKey(1, 0), []);

  const add = (from, to, length) => {
    let targets = nodes.get(from) || [];
    let target = targets.find(t => t[0] == to);
    if (!target) {
      targets.push([to, length]);
    } else {
      if (target[1] < length) {
        target[1] = length;
      }
    }
    nodes.set(from, targets);
  }

  let crossroads = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] == '.') {
        let dirs = 0;
        for (let [dx, dy] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
          if (y + dy < 0 || y + dy >= grid.length || x + dx < 0 || x + dx >= grid.length) {
            continue;
          }
          if (grid[y + dy][x + dx] == '#') {
            continue;
          }

          dirs++;
        }
        if (dirs > 2) {
          crossroads.push([x, y]);
        }
      }
    }
  }

  crossroads.push([1, 0]);

  for (let [sx, sy] of crossroads) {
    let x = sx; y = sy;
    for (let [dx, dy] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
      if (y + dy < 0 || y + dy >= grid.length || x + dx < 0 || x + dx >= grid.length) {
        continue;
      }
      if (grid[y + dy][x + dx] == '#') {
        continue;
      }
      queue.push([sx + dx, sy + dy, getKey(sx, sy), getKey(sx, sy), 1]);
    }

    while (queue.length) {
      let [x, y, start, prev, length] = queue.shift();
      let current = grid[y][x];
      let key = `${x}#${y}`;

      if (goal[0] == x && goal[1] == y) {
        add(start, key, length);
        continue;
      }

      let directions = [];
      if (current != '#') {
        for (let [dx, dy] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
          if (y + dy < 0 || y + dy >= grid.length || x + dx < 0 || x + dx >= grid.length) {
            continue;
          }
          if (grid[y + dy][x + dx] == '#') {
            continue;
          }
          if (getKey(x + dx, y + dy) == prev) {
            continue;
          }
          directions.push([dx, dy]);
        }
      }

      if (directions.length == 1) {
        let [dx, dy] = directions[0];
        queue.push([x + dx, y + dy, start, key, length + 1]);
      } else if (directions.length) {
        add(start, key, length);
      }
    }

  }

  return nodes;
}

module.exports = input => {
  let grid = input.split(/\r?\n/)
    .map(r => r.split(''));

  let nodes = build(grid);

  let queue = [[getKey(1, 0), 0, new Set()]];
  let goal = getKey(grid[0].length - 2, grid.length - 1);
  let max = 0;

  while (queue.length) {
    let [key, length, history] = queue.pop();

    if (key == goal) {
      max = Math.max(max, length);
      continue;
    }

    if (history.has(key)) {
      continue;
    }

    history.add(key);

    for (let [next, dist] of nodes.get(key)) {
      queue.push([next, length + dist, new Set(history)]);
    }
  }

  return max;
}

