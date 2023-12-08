const expect = require("expect.js");
const part1 = require("./part1");
const part2 = require("./part2");

describe("Day 08: Part 1", () => {
          it("Should calculate number of steps required to finish", () => {
                    expect(
                              part1(`RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`)
                    ).to.equal(2);

                    expect(
                              part1(`LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`)
                    ).to.equal(6);
          });
});
describe("Day 08: Part 2", () => {
          it("Should calculate number of steps required to finish all paths starting with A simultaniously", () => {
                    expect(
                              part2(`LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`)
                    ).to.equal(6);
          });
});
