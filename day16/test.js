const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 16: Part 1', () => {
  it('Should count how many tiles become energized', () => {
    expect(part1(`.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`)).to.equal(46);
  });
});
describe('Day 16: Part 2', () => {
  it('Should count the max number of tiles that become energized', () => {
    expect(part2(`.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`)).to.equal(51);
  });
});
