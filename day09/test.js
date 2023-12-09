const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 09: Part 1', () => {
  it('Should calculate sum of next sequence values', () => {
    expect(part1(`0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`)).to.equal(114);
  });
});
describe('Day 09: Part 2', () => {
  it('Should calculate sum of previous sequence values', () => {
    expect(part2(`0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`)).to.equal(2);
  });
});
