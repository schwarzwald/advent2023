class RangeMap {
  constructor(ranges) {
    this.ranges = [];

    let current = 0;
    for (let range of ranges.sort(([, s1], [, s2]) => s1 - s2)) {
      if (current !== range[1]) {
        this.ranges.push([current, current, range[1] - current]);
      }
      this.ranges.push(range);
      current = range[1] + range[2];
    }

    let [, s, l] = this.ranges[this.ranges.length - 1];
    this.ranges.push([s + l, s + l, Number.MAX_VALUE - l - s]);
  }

  getRanges(start, end) {
    let ranges = [];

    for (let [, src, length] of this.ranges) {
      if (end >= src && src + length - 1 >= start) {
        ranges.push([this.get(Math.max(start, src)), this.get(Math.min(end, src + length - 1))]);
      }
    }
    return ranges;
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

  let min = Number.MAX_VALUE;
  for (let i = 0; i < seeds.length - 1; i += 2) {
    let ranges = maps.reduce((r, map) => r.map(x => map.getRanges(...x)).flat(1), [[seeds[i], seeds[i] + seeds[i + 1] - 1]]);
    min = Math.min(min, ...ranges.flat());
  }

  return min;
}
