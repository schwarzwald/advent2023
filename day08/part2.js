function steps(tree, position) {}
module.exports = (input) => {
          let rows = input.split(/\r?\n/);
          let instructions = [...rows[0]];

          let tree = rows
                    .slice(2)
                    .map((r) => /([\w]+) = \(([\w]+), ([\w]+)\)/.exec(r))
                    .map(([, a, l, r]) => [a, l, r])
                    .reduce((map, [a, l, r]) => map.set(a, [l, r]), new Map());

          let positions = [...tree.keys()].filter((a) => a.endsWith("A"));
          let ip = 0;
          let length = 0;
          while (positions.some((e) => !e.endsWith("Z"))) {
                    positions = positions.map(
                              (position) =>
                                        tree.get(position)[
                                                  instructions[
                                                            ip %
                                                                      instructions.length
                                                  ] == "L"
                                                            ? 0
                                                            : 1
                                        ]
                    );
                    ip++;
                    length++;
          }
          return length;
};
