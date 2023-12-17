const { MinPriorityQueue } = require('@datastructures-js/priority-queue');
module.exports = input => {
  let grid = input.split(/\r?\n/)
    .map(r => r.split('').map(Number));

  let queue = new MinPriorityQueue(a => a[3]);
  queue.enqueue([0, 0, 0, grid.length + grid[0].length, [], 0]);
  let visited = new Map();

  const equal = ([x1, y1], [x2, y2]) => x1 === x2 && y1 === y2;
  const inBounds = (x, y, grid) => x >= 0 && x < grid[0].length && y >= 0 && y < grid.length;

  let total = (grid.length + grid[0].length - 2) * 9;

  const getKey = (x, y, dir, count) => {
    return `${x}#${y}#${count}/${dir.join('#')}`;
  }

  while (queue.size()) {
    let [x, y, heatloss, h, dir, count] = queue.dequeue();
    let mustTurn = count == 10;
    let key = getKey(x, y, dir, count);

    let prev = visited.get(key);
    if (prev != null && prev < heatloss) {
      continue;
    }

    if (x == grid[0].length - 1 && y == grid.length - 1) {
      return Math.min(total, heatloss);
    }

    if (heatloss >= total) {
      break;
    }

    visited.set(key, heatloss);

    let next = [];
    if (dir.length) {
      if (!mustTurn) {
        next.push(dir);
      }
      next.push([dir[1], dir[0]]);
      next.push([-dir[1], -dir[0]]);
    } else {
      next.push([0, 1], [1, 0]);
    }

    for (let [dx, dy] of next) {
      let ndir = [dx, dy];
      let forward = dir.length && equal(dir, ndir);
      let ncount = forward ? count + 1 : 4;
      let nx = x + dx * (forward ? 1 : 4);
      let ny = y + dy * (forward ? 1 : 4);

      if (!inBounds(nx, ny, grid)) {
        continue;
      }

      let nh = heatloss;
      if (forward) {
        nh += grid[ny][nx];
      } else {
        for (let i = 1; i <= 4; i++) {
          nh += grid[y + dy * i][x + dx * i];
        }
      }

      let nkey = getKey(nx, ny, ndir, ncount);
      if (nh < (visited.get(nkey) || Number.MAX_SAFE_INTEGER)) {
        queue.enqueue([nx, ny, nh, nh + grid.length - 1 - ny + grid[0].length - 1 - nx, ndir, ncount]);
      }
    }
  }

  return total;
}
