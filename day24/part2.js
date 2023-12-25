function det(x1, y1, x2, y2) {
  return x1 * y2 - y1 * x2;
}

function intersect(p1, v1, p2, v2) {
  let r1 = p2.x - p1.x;
  let r2 = p2.y - p1.y;

  let d = det(v1.x, -v2.x, v1.y, -v2.y);
  let d1 = det(r1, -v2.x, r2, -v2.y);
  let d2 = det(v1.x, r1, v1.y, r2);

  if (d != 0) {
    let t = d1 / d;
    let u = d2 / d;

    let f1z = p1.z + v1.z * t;
    let f2z = p2.z + v2.z * u;

    if (f1z == f2z) {
      return {
        x: p1.x + v1.x * t,
        y: p1.y + v1.y * t,
        z: p1.z + v1.z * t
      }
    }
  }

  return null;
}

function equals(p1, p2) {
  return p1 && p2 && p1.x == p2.x && p1.y == p2.y && p1.z == p2.z;
}

module.exports = (input) => {
  let stones = input.split(/\r?\n/)
    .map(r => r.split(' @ ')
      .map(p => p.split(', ')
        .map(e => Number(e.trim())))
      .map(([x, y, z]) => ({ x, y, z })));

  let [p1, v1] = stones[0];
  let [p2, v2] = stones[1];
  let [p3, v3] = stones[2];
  let lim = 250;

  for (let dx = -lim; dx <= lim; dx++) {
    for (let dy = -lim; dy <= lim; dy++) {
      for (let dz = -lim; dz <= lim; dz++) {

        let i1 = intersect(
          p1,
          { x: v1.x - dx, y: v1.y - dy, z: v1.z - dz },
          p2,
          { x: v2.x - dx, y: v2.y - dy, z: v2.z - dz });

        if (!i1) {
          continue;
        }

        let i2 = intersect(
          p1,
          { x: v1.x - dx, y: v1.y - dy, z: v1.z - dz },
          p3,
          { x: v3.x - dx, y: v3.y - dy, z: v3.z - dz });

        if (!i2) {
          continue;
        }

        let i3 = intersect(
          p2,
          { x: v2.x - dx, y: v2.y - dy, z: v2.z - dz },
          p3,
          { x: v3.x - dx, y: v3.y - dy, z: v3.z - dz });

        if (equals(i1, i2) && equals(i1, i3)) {
          return i1.x + i1.y + i1.z;
        }
      }
    }
  }
}
