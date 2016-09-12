/**
 * base on rm-hull/max7219
 *
 * below is what matrix|sevensegment can do
 */

const device = ['sevensegment', 'matrix'];

const commonOption = {
	device: 'sevensegment',
	cascaded: 2,
	vertical: false,
	methods: [
		clear: {
			deviceId: null
		},
		flush: {},
		brightness: 7,
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
	]
};

const sevensegmentMethod = [
	letter: {
		deviceId: 0,
		position: 1,
		char: 'a',
		dot: false,
		redraw: true
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
];


const matrixMethod = [
	letter: {
		deviceId: 0,
		asciiCode: 0,
		font: null,
		redraw: true
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
		redraw: true
	},
	invert: {
		value: 0,
		redrawn: true
	},
	orientation: {
		angle: 0, //[0, 90, 180, 270]
		redrawn: true
	}
];