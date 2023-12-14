function cycle(grid) {
  for (let x = 0; x < grid[0].length; x++) {
    let top = 0;
    for (let y = 0; y < grid.length; y++) {
      if (grid[y][x] == 'O') {
        grid[top][x] = 'O';
        if (top != y) {
          grid[y][x] = '.';
        }
        top++;
      } else if (grid[y][x] == '#') {
        top = y + 1;
      }
    }
  }

  for (let y = 0; y < grid.length; y++) {
    let left = 0;
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] == 'O') {
        grid[y][left] = 'O';
        if (left != x) {
          grid[y][x] = '.';
        }
        left++;
      } else if (grid[y][x] == '#') {
        left = x + 1;
      }
    }
  }

  for (let x = 0; x < grid[0].length; x++) {
    let bottom = grid.length - 1;
    for (let y = bottom; y >= 0; y--) {
      if (grid[y][x] == 'O') {
        grid[bottom][x] = 'O';
        if (bottom != y) {
          grid[y][x] = '.';
        }
        bottom--;
      } else if (grid[y][x] == '#') {
        bottom = y - 1;
      }
    }
  }

  for (let y = 0; y < grid.length; y++) {
    let right = grid[0].length - 1;
    for (let x = right; x >= 0; x--) {
      if (grid[y][x] == 'O') {
        grid[y][right] = 'O';
        if (right != x) {
          grid[y][x] = '.';
        }
        right--;
      } else if (grid[y][x] == '#') {
        right = x - 1;
      }
    }
  }
}

module.exports = input => {
  let grid = input.split(/\r?\n/)
    .map(r => r.split(''));

  let history = [];
  let total = 1000000000;
  for (let i = 0; i < total; i++) {
    let current = grid.map(r => r.join('')).join('$');
    let index = history.indexOf(current);
    if (index >= 0) {
      grid = history[index + (total - i) % (history.length - index)].split('$').map(r => r.split(''));
      break;
    }
    history.push(current);
    cycle(grid);
  }

  let sum = 0;
  for (let x = 0; x < grid[0].length; x++) {
    for (let y = 0; y < grid.length; y++) {
      if (grid[y][x] == 'O') {
        sum += grid.length - y;
      }
    }
  }

  return sum;
}
