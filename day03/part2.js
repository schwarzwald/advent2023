module.exports = input => {
  let grid = input.split(/\r?\n/);
  let sum = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == '*') {
        let numbers = [];

        for (let dy of [-1, 0, 1]) {
          let sy = i + dy;

          if (sy >= 0 && sy < grid.length) {
            if (isNaN(grid[sy][j])) {
              for (let dx of [-1, 1]) {
                let sx = j;
                while (sx + dx >= 0 && sx + dy < grid[sy].length && !isNaN(grid[sy][sx + dx])) {
                  sx += dx;
                }

                if (dx == -1) {
                  numbers.push(grid[sy].substring(sx, j));
                } else {
                  numbers.push(grid[sy].substring(j + 1, sx + 1));
                }
              }
            } else {
              let lx = j;
              while (lx - 1 >= 0 && !isNaN(grid[sy][lx - 1])) {
                lx--;
              }

              let rx = j;
              while (rx + 1 < grid[sy].length && !isNaN(grid[sy][rx + 1])) {
                rx++;
              }

              numbers.push(grid[sy].substring(lx, rx + 1));
            }
          }
        }

        numbers = numbers.filter(n => n != '').map(Number);
        if (numbers.length == 2) {
          sum += numbers[0] * numbers[1];
        }
      }
    }
  }
  return sum;
}
