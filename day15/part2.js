module.exports = input => {
  let lenses = input.split(',')
    .map(r => r.split(/[=-]/))

  let boxes = [];
  for (let i = 0; i < 256; i++) {
    boxes.push([]);
  }

  for (let [id, second] of lenses) {
    let hash = id.split('')
      .reduce((sum, a) => ((sum + a.charCodeAt(0)) * 17) % 256, 0);

    let box = boxes[hash];
    let index = box.findIndex(r => r[0] == id);
    if (second != '') {
      if (index >= 0) {
        box.splice(index, 1, [id, second]);
      } else {
        box.push([id, second]);
      }
    } else if (index >= 0) {
      box.splice(index, 1);
    }
  }

  return boxes.reduce((sum, box, i) => sum + (i + 1) * box.reduce((bs, [id, value], j) => bs + (j + 1) * value, 0), 0);
}