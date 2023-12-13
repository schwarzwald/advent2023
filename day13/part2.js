function diff(first, second) {
  return [...first].filter((c, i) => c != second[i]).length;
}

function reflection(pattern) {
  for (let row = 1; row < pattern.length; row++) {
    let diffCount = 0;
    for (let i = row; i < pattern.length && (2 * row - i - 1) >= 0; i++) {
      diffCount += diff(pattern[i], pattern[2 * row - i - 1]);
      if (diffCount > 1) {
        break;
      }
    }

    if (diffCount == 1) {
      return row;
    }
  }

  return 0;
}

function count(pattern) {
  return 100 * reflection(pattern) || reflection([...pattern[0]].map((_, i) => pattern.map(p => p[i]).join('')));
}

module.exports = input =>
  input.split(/\r?\n\r?\n/)
    .map(g => g.split(/\r?\n/))
    .map(p => count(p)).reduce((a, b) => a + b);
