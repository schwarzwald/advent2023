const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 18: Part 1', () => {
  it('Should count how many cubic meters were dug', () => {
    expect(part1(`R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`)).to.equal(62);
  });
});
describe('Day 18: Part 2', () => {
  it('Should calculate the area after parsing hexcode', () => {
    expect(part2(`R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`)).to.equal(952408144115);
  });
});
