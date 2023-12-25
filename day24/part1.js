function det([x1, y1], [x2, y2]) {
  return x1 * y2 - y1 * x2;
}

module.exports = (input, from = 200000000000000, to = 400000000000000) => {
  let stones = input.split(/\r?\n/)
    .map(r => r.split(' @ ')
      .map(p => p.split(', ')
        .map(e => Number(e.trim())))
      .map(([x, y, z]) => ({ x, y, z })));

  let count = 0;

  for (let i = 0; i < stones.length - 1; i++) {
    let [p1, v1] = stones[i];

    for (let j = i + 1; j < stones.length; j++) {
      let [p2, v2] = stones[j];

      let r1 = p2.x - p1.x;
      let r2 = p2.y - p1.y;

      let d = det([v1.x, -v2.x], [v1.y, -v2.y]);

      if (d != 0) {
        let d1 = det([r1, -v2.x], [r2, -v2.y]);
        let d2 = det([v1.x, r1], [v1.y, r2]);

        let t = d1 / d;
        let u = d2 / d;

        if (t >= 0 && u >= 0) {
          let f1x = p1.x + v1.x * t;
          let f1y = p1.y + v1.y * t;

          if (f1x >= from && f1x <= to && f1y >= from && f1y <= to) {
            count++;
          }
        }
      }
    }
  }

  return count
}
