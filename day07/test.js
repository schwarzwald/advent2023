const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 07: Part 1', () => {
  it('Should calculate total winnings', () => {
    expect(part1(`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`)).to.equal(6440);
  });
});
describe('Day 07: Part 2', () => {
  it('Should calculate total winnings using jokers', () => {
    expect(part2(`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`)).to.equal(5905);
  });
});
