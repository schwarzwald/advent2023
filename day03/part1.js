module.exports = input => {
  let grid = input.split(/\r?\n/);
  let sum = 0;
  for (let i = 0; i < grid.length; i++) {
    let number = null;
    let partOfEngine = false;

    for (let j = 0; j < grid[i].length; j++) {
      if (!isNaN(grid[i][j])) {
        if (number == null) {
          number = grid[i][j];
        } else {
          number += '' + grid[i][j];
        }

        if (!partOfEngine) {
          for (let [dx, dy] of [[-1, 0], [1, 0], [-1, 1], [-1, -1], [1, 1], [1, -1], [0, 1], [0, -1]]) {
            if (i + dx >= 0 && i + dx < grid[i].length && j + dy >= 0 && j + dy < grid.length) {
              if (grid[i + dx][j + dy] != '.' && isNaN(grid[i + dx][j + dy])) {
                partOfEngine = true;
                break;
              }
            }
          }
        }
      }

      if (isNaN(grid[i][j]) || j == grid[i].length - 1) {
        if (number != null && partOfEngine) {
          sum += +number;
        }
        number = null;
        partOfEngine = false;
      }
    }
  }
  return sum;
}
