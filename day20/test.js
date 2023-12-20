const expect = require('expect.js');
const part1 = require('./part1');

describe('Day 20: Part 1', () => {
  it('Should multiply number of low and high pulses after pushing the button 1000 times #1', () => {
    expect(part1(`broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`)).to.equal(32000000);
  });

  it('Should multiply number of low and high pulses after pushing the button 1000 times #2', () => {
    expect(part1(`broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`)).to.equal(11687500);
  });
});
