var Max7219 = require('node-max7219');

var options = {
	device: 'matrix',
	cascaded: 8,
	vertical: true
};

// var options = {
// 	device: 'sevensegment',
// 	cascaded: 2,
// 	vertical: false
// };

var max7219 = Max7219(options);

/**
 * fast teset
 */
max7219.drawText('The repl module exports the repl.REPLServer class. While running, instances of repl.REPLServer');


/**
 * run through cli
 */
// const repl = require('repl');

// repl.inject = function(injectedObj){
// 	var r = repl.start('>');
// 	Object.keys(injectedObj).forEach(function(key){
// 		r.context[key] = injectedObj[key];
// 	});
	
// };

// repl.inject({
// 	max7219: max7219
// });