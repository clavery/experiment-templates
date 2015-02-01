
var randomColor = Array(1,2,3).map(() => { return Math.round(Math.random() * 255) });

export default {
  Count: {
    color: `rgb(${randomColor.join(',')})`,
    fontSize: 24
  }
};
