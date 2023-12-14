module.exports = input => {
  let grid = input.split(/\r?\n/)
    .map(r => r.split(''));

  let sum = 0;
  for (let x = 0; x < grid[0].length; x++) {
    let top = 0;
    for (let y = 0; y < grid.length; y++) {
      if (grid[y][x] == 'O') {
        sum += grid.length - top;
        top++;
      } else if (grid[y][x] == '#') {
        top = y + 1;
      }
    }
  }

  return sum;
}
