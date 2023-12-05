class RangeMap {
  constructor(ranges) {
    this.ranges = ranges;
  }

  get(source) {
    for (let [dest, src, length] of this.ranges) {
      if (source >= src && source < src + length) {
        return dest + source - src;
      }
    }
    return source;
  }
}

module.exports = input => {
  let sections = input.split(/\r?\n\r?\n/);
  let seeds = sections[0].split(': ')[1].split(' ').map(Number);
  let maps = sections.slice(1).map(d => new RangeMap(d.split(/\r?\n/).slice(1).map(r => r.split(' ').map(Number))));

  return Math.min(...seeds.map(s => maps.reduce((seed, map) => map.get(seed), s)));
}
