module.exports = input => {
  let bricks = input.split(/\r?\n/)
    .map(r => r.split('~')
      .map(p => p.split(',')
        .map(Number))
      .map(([x, y, z]) => ({ x, y, z })))
    .map((b, i) => [...b, i])
    .sort((b1, b2) => b1[0].z - b2[0].z);

  let settled = [];
  let supported = new Map();

  for (let [p1, p2, i] of bricks) {
    let foundZ = 0;
    for (let [q1, q2, j] of [...settled].sort((b1, b2) => b2[1].z - b1[1].z)) {
      if (p1.x <= q2.x && p2.x >= q1.x && p1.y <= q2.y && p2.y >= q1.y) {
        if (!foundZ) {
          settled.push([
            { x: p1.x, y: p1.y, z: q2.z + 1 },
            { x: p2.x, y: p2.y, z: q2.z + 1 + Math.abs(p2.z - p1.z) },
            i]);
          foundZ = q2.z;
        }

        if (q2.z == foundZ) {
          supported.set(i, supported.get(i) || []).get(i).push(j);
        }
      }
    }
    if (!foundZ) {
      settled.push([
        { x: p1.x, y: p1.y, z: 1 },
        { x: p2.x, y: p2.y, z: 1 + Math.abs(p2.z - p1.z) },
        i]);
    }
  }

  return settled.filter(([, , i]) => ![...supported.values()]
    .some(e => e.length == 1 && e[0] == i)).length;
}
