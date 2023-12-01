const expect = require('expect.js');
const part1 = require('./part1');
const part2 = require('./part2');

describe('Day 01: Part 1', () => {
  it('Should add first and last digit and return sum', () => {
    expect(part1(
      `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`)).to.equal(142);
  })
});
describe('Day 01: Part 2', () => {
  it('Should add first and last digit considering also words and return sum', () => {
    expect(part2(
      `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`)).to.equal(281);
  });
});
