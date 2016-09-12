process.env.DEBUG = 'info';
var Max7219 = require('../index.js');

// var max7219 = Max7219();

// console.log(max7219.getOptions());

// max7219.drawText();

var max7219 = Max7219({
	device: 'matrix',
	cascaded: 4,
	vertical: true,
	brightness: 15
});
console.log(max7219);
max7219.showMessage('hoang anh', 'up');