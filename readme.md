# node max7219

Simple version of node wrap a _really cool_ python package for max7219 [rm-hull/max7219](https://github.com/rm-hull/max7219)

## Usage:

    var Max7219 = require('node-max7219');

    var originOptions = {
    	device: 'sevensegment',
    	cascaded: 2,
    	brightness: 7,
    	vertical: false
    };

    var max7219 = Max7219(options);

    max7219.drawText('hello world');

## Note:

you must read rm-hull/max7219 guide
to install enough dependencies which let node exec **python code**
follow these steps: https://luma-led-matrix.readthedocs.io/en/latest/install.html

## Review on YouTube:

- [node max7219 2016 09 07 195105 ](https://www.youtube.com/watch?v=4vBFxDvuNFI)
