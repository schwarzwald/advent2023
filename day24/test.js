const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 24: Part 1', () => {
  it('Should calculate how many hailstones will cross path', () => {
    expect(part1(`19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3`, 7, 27)).to.equal(2);
  });
});
describe('Day 24: Part 2', () => {
  it('Should find position and velocity which collides with all hailstones', () => {
    expect(part2(`19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3`, 7, 27)).to.equal(47);
  });
});
