var util = require('util');

var info = require('debug')('info');

var error = require('debug')('error');

var psTree = require('ps-tree');

var kill = function(pid, signal, callback){
	signal = signal || 'SIGKILL';
	callback = callback || function(){
		};
	var killTree = true;
	if(killTree){
		psTree(pid, function(err, children){
			[pid].concat(
				children.map(function(p){
					return p.PID;
				})
			).forEach(function(tpid){
				try{
					process.kill(tpid, signal)
				}
				catch(ex){
				}
			});
			callback();
		});
	}else{
		try{
			process.kill(pid, signal)
		}
		catch(ex){
		}
		callback();
	}
};

/**
 * base on rm-hull/max7219
 *
 * below is what matrix|sevensegment can do
 */

const devices = ['sevensegment', 'matrix'];

const commonOption = {
	options: {
		device: 'sevensegment',
		cascaded: 2,
		vertical: false
	},
	methods: {
		clear: {
			deviceId: null
		},
		flush: {},
		brightnessX: 7,
		brightness: {
			intensity: 7
		},
		set_byte: {
			deviceId: 0,
			position: 1,
			value: 1,
			redraw: true
		},
		rotate_left: {
			redrawn: true
		},
		rotate_right: {
			redrawn: true
		},
		scroll_left: {
			redrawn: true
		},
		scroll_right: {
			redrawn: true
		}
	}
};

const deviceMethod = {
	sevensegment: {
		letter: {
			deviceId: 0,
			position: 1,
			char: 'a',
			dot: false,
			redrawn: true
		},
		write_number: {
			deviceId: 0,
			value: 1,
			base: 10,
			decimalPlaces: 0,
			zeroPad: false,
			leftJustify: false
		},
		write_text: {
			deviceId: 0,
			text: 'a'
		},
		show_message: {
			text: 'a',
			delay: 0.4
		}
	},
	matrix: {
		letter: {
			deviceId: 0,
			asciiCode: 0,
			font: null,
			redrawn: true
		},
		scroll_up: {
			redrawn: true
		},
		scroll_down: {
			redrawn: true
		},
		show_message: {
			text: 'a',
			font: null,
			delay: 0.05,
			always_scroll: false
		},
		pixel: {
			x: 0,
			y: 0,
			value: 0,
			redrawn: true
		},
		invert: {
			value: 0,
			redrawn: true
		},
		orientation: {
			angle: 0, //[0, 90, 180, 270]
			redrawn: true
		}
	}
};

var max7219 = function(options){
	var max7219 = this;

	var xyz = Object.assign({}, commonOption);

	options = options ? options : {};

	max7219.getOptions = function(){
		return xyz;
	};

	var setOptions = function(opt){
		Object.keys(opt).forEach(function(key){
			//let user-options override default
			xyz.options[key] = opt[key];
		});

		var device = xyz.options.device;
		devices.includes(device) ? false : function(){
			error(util.format('%s, not support\n, only allow: %s', device, devices));
			xyz.options.device = 'sevensegment';
		}();

		Object.assign(xyz.options.methods, deviceMethod[device]);
	};

	/**
	 * initialize needded object
	 * @return {[type]} [description]
	 */
	var init = function(){
		setOptions(options);
	};

	init();

	var exec = require('child_process').exec;
	var p;

	var stopF = function(){
		!p ? false : function(){
			kill(p.pid);
		}();
	};

	var buildCmd = function(){
		var cmd = util.format('python %s/bin/drawText.py', __dirname);

		Object.keys(xyz.options).forEach(function(key){
			var format = ' --%s %s';
			var val = options[key];

			key == 'message' ? val = '\"' + val + '\"' : false;

			key == 'vertical' ?
				function(){
					val = 'True';
				}() :
				function(){
					format = '%s%s';
					key = '';
					val = '';
				}();

			cmd += util.format(format, key, val);
		});

		cmd += util.format(' --method %s', xyz.run);
		Object.keys(xyz.methods[xyz.run]).forEach(function(opt){
			cmd += util.format(' %s', opt);
		});

		info(cmd);

		return cmd;
	};

	var mapNodePy = {
		clear: 'clear',
		flush: 'flush',
		setByte: 'setByte',
		rotateLeft: 'rotate_left',
		rotateRight: 'rotate_right',
		scrollLeft: 'scroll_left',
		scrollRight: 'scroll_right',
		letter: 'letter',
		writeNumber: 'write_number',
		writeText: 'write_text',
		showMessage: 'show_message',
		scrollUp: 'scroll_up',
		scrollDown: 'scroll_down',
		pixel: 'pixel',
		invert: 'invert',
		orientation: 'orientation'
	};

	Object.keys(mapNodePy).forEach(function(node){
		max7219[node] = function(options){
			stopF();
			var py = mapNodePy[node];
			xyz.methods[py] = options;
			xyz.run = py;
			p = exec(buildCmd());
		};
	});

	max7219.on = function(status, callback){
		var supported = ['close', 'finished'];

		if(supported.indexOf(status) < 0){
			error(util.format('On <%s>: Event not supported', status));
			return;
		}

		p.on('close', function(){
			info(util.format('On <%s>: '), status);
			callback();
		});
	};
};

module.exports = max7219;