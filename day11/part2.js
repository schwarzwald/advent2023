module.exports = (input, multiplier = 1000000) => {
  let grid = input.split(/\r?\n/)
    .map(r => r.split(''));

  let galaxies = [];
  let emptyRows = [];
  let emptyColumns = [];

  for (let y = 0; y < grid.length; y++) {
    let empty = true;
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] == '#') {
        galaxies.push([x, y]);
        empty = false;
      }
    }
    if (empty) {
      emptyRows.push(y);
    }
  }
  for (let x = 0; x < grid[0].length; x++) {
    let empty = true;
    for (let y = 0; y < grid.length; y++) {
      if (grid[y][x] == '#') {
        empty = false;
        break;
      }
    }
    if (empty) {
      emptyColumns.push(x);
    }
  }
  let sum = 0;
  for (let i = 0; i < galaxies.length - 1; i++) {
    let g1 = galaxies[i];
    for (let j = i + 1; j < galaxies.length; j++) {
      let g2 = galaxies[j];

      let minX = Math.min(g1[0], g2[0]);
      let maxX = Math.max(g1[0], g2[0]);

      let rows = emptyRows.filter(c => c > g1[1] && c < g2[1]).length;
      let cols = emptyColumns.filter(c => c > minX && c < maxX).length;
      sum += maxX - minX + g2[1] - g1[1] + (rows + cols) * (multiplier - 1);
    }
  }
  return sum;
}
