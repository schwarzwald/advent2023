const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 06: Part 1', () => {
  it('Should multiply the number of ways how to win each race', () => {
    expect(part1(`Time:      7  15   30
Distance:  9  40  200`)).to.equal(288);
  });
});
describe('Day 06: Part 2', () => {
  it('Should calculate the number of ways how to win one long race', () => {
    expect(part2(`Time:      7  15   30
Distance:  9  40  200`)).to.equal(71503);
  })
});
