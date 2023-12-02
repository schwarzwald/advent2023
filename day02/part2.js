module.exports = input =>
  input.split(/\r?\n/)
    .map(r => r.split(': ')[1].split('; '))
    .map(draws =>
      draws.map(draw => {
        let red = 0;
        let green = 0;
        let blue = 0;

        let balls = draw.split(', ');
        for (let ball of balls) {
          let [count, color] = ball.split(' ');
          if (color == 'red') {
            red = +count;
          } else if (color == 'green') {
            green = +count;
          } else {
            blue = +count;
          }
        }
        return [red, green, blue]
      }))
    .map(draws =>
      Math.max(...draws.map(d => d[0])) *
      Math.max(...draws.map(d => d[1])) *
      Math.max(...draws.map(d => d[2]))
    )
    .reduce((a, b) => a + b);