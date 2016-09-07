var util = require('util');
var max7219 = function(options){
	var originOptions = {
		device: 'sevensegment',
		cascade: 1,
		brightness: 1,
		vertical: true
	};
	/**
	 * default options
	 */
	// var defaultOptions = {
	// 	device: 'sevensegment',
	// 	message: 'hello world',
	// 	cascade: 1,
	// 	brightness: 1,
	// 	vertical: true
	// };
	/**
	 * clone defaultOption from original
	 */
	var defaultOptions = Object.assign({}, originOptions);
	// Object.keys(originOptions).forEach(function(key){
	// 	defaultOptions[key] = originOptions[key];
	// });

	//push options into default {}
	//when use not submit
	//in node 6x, we can set default for params
	options = options ? options : {};

	// //Object.keys return empty array []
	// //if options is NOT an object or $%^
	// Object.keys(options).forEach(function (key) {
	// 	//let user-options override default
	// 	defaultOptions[key] = options[key];
	// });
	/**
	 * by define setOptions for use easy custommize
	 * initialize options by call setOptions
	 */

	/**
	 * store exec process
	 * to terminate it when run a new one
	 */

	/**
	 * execute python command
	 */
	var exec = require('child_process').exec;
	var previousProcess;
	previousProcess ? previousProcess.kill() : false;

	var drawText = function(message){
		options.message = message;
		console.log('drawText based on', options);
		// var cmd = 'sudo python ./drawText';
		// console.log(__dirname);
		// var cmd = 'sudo python ' + __dirname + '/bin/drawText.py';
		var cmd = util.format('sudo python %s/bin/drawText.py', __dirname);
		Object.keys(options).forEach(function(key){
			// cmd += ' --' + key + ' ' + options[key];
			var val = options[key] ;

			key == 'message' ? val = '\"' + val + '\"' : false;

			key == 'vertical' ? val = val ? 'True' : 'False' : false;
			 
			cmd += util.format(' --%s %s', key, options[key]);
		});

		console.log(cmd);

		previousProcess = exec(cmd, function(err, stdout){
			console.log(stdout);
		});
	};

	var getOptions = function(){
		return options;
	};

	var getDefaultOption = function(){
		//like an original options
		//we ALWAYS return this one
		//instead of modified defaultOptions
		return {
			message: 'hello world',
			cascade: 1,
			brightness: 1,
			vertical: true
		};
	};

	var setOptions = function(opt){
		//Object.keys return empty array []
		//if options is NOT an object or $%^
		Object.keys(opt).forEach(function(key){
			//let user-options override default
			defaultOptions[key] = opt[key];
		});
		//assign back to options
		options = defaultOptions;
	};

	/**
	 * initialize needded object
	 * @return {[type]} [description]
	 */
	var init = function(){
		setOptions(options);
	};

	init();

	return {
		drawText: drawText,
		getOptions: getOptions,
		setOptions: setOptions,
		getDefaultOption: getDefaultOption
	};
};

module.exports = max7219;