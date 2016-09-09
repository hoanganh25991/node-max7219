var util = require('util');
var max7219 = function(options){
	var originOptions = {
		device: 'sevensegment',
		cascaded: 2,
		brightness: 7,
		vertical: false
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
	// var spawn = require('child_process').spawn;
	var previousProcess;
	// previousProcess ? previousProcess.kill() : false;
	var psTree = require('ps-tree');
	var kill = function (pid, signal, callback) {
		    signal   = signal || 'SIGKILL';
		    callback = callback || function () {};
		    var killTree = true;
		    if(killTree) {
		        psTree(pid, function (err, children) {
		            [pid].concat(
		                children.map(function (p) {
		                    return p.PID;
		                })
		            ).forEach(function (tpid) {
		                try { process.kill(tpid, signal) }
		                catch (ex) { }
		            });
		            callback();
		        });
		    } else {
		        try { process.kill(pid, signal) }
		        catch (ex) { }
		        callback();
		    }
		};

	var drawText = function(message){
		previousProcess ? function(){
			// console.log('kill process');
			// previousProcess.stdin.pause();
			// previousProcess.kill('SIGKILL');
			kill(previousProcess.pid);
		}() : false;

		options.message = message;
		// console.log('drawText based on', options);
		// var cmd = 'sudo python ./drawText';
		// console.log(__dirname);
		// var cmd = 'sudo python ' + __dirname + '/bin/drawText.py';
		var cmd = util.format('sudo python %s/bin/drawText.py', __dirname);
		// var cmd = 'sudo';

		// var args = [];

		// args.push('python');
		// args.push(__dirname + '/bin/drawText.py');
		
		Object.keys(options).forEach(function(key){
			// cmd += ' --' + key + ' ' + options[key];
			var format = ' --%s %s';
			var val = options[key] ;

			key == 'message' ? val = '\"' + val + '\"' : false;
			
			var optionStr =  util.format(format, key, val);

			key == 'vertical' ? (val ? optionStr = ' --vertical True' : optionStr = '') : false;
			

			// if(key == 'vertical'){
			// 	val = val ? val = 'True' : val = 'False'
			// }
			cmd += optionStr;
			// args.push(optionStr);
		});

		console.log(cmd);

		previousProcess = exec(cmd);
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
		getXyz: getXyz
	};
};

module.exports = max7219;