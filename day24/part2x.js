//const { BigNumber } = require('BigNumber');
//const BigNumber = require('js-big-decimal')
const BigNumber = require('bignumber.js');

function det([x1, y1], [x2, y2]) {
  let p1 = x1.multipliedBy(y2);
  let p2 = y1.multipliedBy(x2);
  return p1.minus(p2);
}

module.exports = (input, from = 200000000000000, to = 400000000000000) => {
  from = BigNumber(from);
  to = new BigNumber(to);
  const ZERO = new BigNumber(0);
  const equals = (n1, n2) => n1.comparedTo(n2) === 0;

  let stones = input.split(/\r?\n/)
    .map(r => r.split(' @ ')
      .map(p => p.split(', ')
        .map(e => new BigNumber(e.trim())))
      .map(([x, y, z]) => ({ x, y, z })));

  let count = 0;

  for (let i = 0; i < stones.length - 1; i++) {
    let [p1, v1] = stones[i];

    for (let j = i + 1; j < stones.length; j++) {
      let [p2, v2] = stones[j];

      let r1 = p2.x.minus(p1.x);
      let r2 = p2.y.minus(p1.y);

      let d = det([v1.x, v2.x.negated()], [v1.y, v2.y.negated()]);
      let d1 = det([r1, v2.x.negated()], [r2, v2.y.negated()]);
      let d2 = det([v1.x, r1], [v1.y, r2]);

      if (d.comparedTo(ZERO) != 0) {
        let t = d1.dividedBy(d);
        let u = d2.dividedBy(d);

        if (t.comparedTo(ZERO) >= 0 && u.comparedTo(ZERO) >= 0) {
          let f1x = p1.x.plus(v1.x.multipliedBy(t));
          let f1y = p1.y.plus(v1.y.multipliedBy(t));

          if (f1x.comparedTo(from) >= 0 && f1x.comparedTo(to) <= 0 && f1y.comparedTo(from) >= 0 && f1y.comparedTo(to) <= 0) {
            count++;
          }
        }
      }
    }
  }

  return count // count > 14069;
}
