#!/usr/bin/env python
import max7219.led as led
import time
from max7219.font import proportional, SINCLAIR_FONT, TINY_FONT, CP437_FONT
from max7219.font import DEFAULT_FONT

import argparse

parser = argparse.ArgumentParser()
parser.add_argument('--device', help='string, sevensegment or matrix', type=str, default='sevensegment')
parser.add_argument('--cascaded', help='integer, how many devices concated', type=int, default=1)
parser.add_argument('--brightness', help='integer from 1 to 16', type=int, default=7)
parser.add_argument('--vertical', help='boolean, device concated in which direction', type=bool, default=False)

parser.add_argument('--method', help='which method called', type=str, default='show_message')
parser.add_argument('options', metavar='O', type=str, nargs='+', help='options of method')
args = parser.parse_args()

# print args
def scroll_left(self):
    del self._buffer[0]
    self._buffer.append(0)
def scroll_right(self):
    del self._buffer[-1]
    self._buffer.insert(0, 0)
def scroll_up(self):
        self._buffer = [value >> 1 for value in self._buffer]
def scroll_down(self):
    self._buffer = [(value << 1) & 0xff for value in self._buffer]
def show_message(self, text, direction='left', font=None, delay=0.05, always_scroll=False):
    if not font:
        font = DEFAULT_FONT

    display_length = self.NUM_DIGITS * self._cascaded
    src = [c for ascii_code in text for c in font[ord(ascii_code)]]
    scroll = always_scroll or len(src) > display_length
    if scroll:
        # Add some spaces on (same number as cascaded devices) so that the
        # message scrolls off to the left completely.
        src += [c for ascii_code in ' ' * self._cascaded
                for c in font[ord(ascii_code)]]
    else:
        # How much margin we need on the left so it's centered
        margin = int((display_length - len(src))/2)
        # Reset the buffer so no traces of the previous message are left
        self._buffer = [0] * display_length
    direction = 'scroll_' + direction
    del self._buffer[0]
    self._buffer.append(0)
    del self._buffer[0]
    self._buffer.append(0)
    del self._buffer[0]
    self._buffer.append(0)
    del self._buffer[0]
    self._buffer.append(0)
    del self._buffer[0]
    self._buffer.append(0)
    del self._buffer[0]
    self._buffer.append(0)
    del self._buffer[0]
    self._buffer.append(0)
    del self._buffer[0]
    self._buffer.append(0)
    del self._buffer[0]
    self._buffer.append(0)
    del self._buffer[0]
    self._buffer.append(0)
    for pos, value in enumerate(src):
        if scroll:
            time.sleep(delay)
            getattr(self, direction)(redraw=False)
            # self.scroll_left(redraw=False)
            self._buffer[-1] = value
            self.flush()
        else:
            self._buffer[margin+pos] = value
    if not scroll:
        self.flush()

device = getattr(led, args.device)(cascaded=args.cascaded, vertical=args.vertical)

device.show_message = show_message

getattr(device, 'brightness')(args.brightness)

# options from node

# 		write_text: {
# 			text: 'hello world',
# 			orientation: 0,
# 			invert: 0
# 		}
if args.method == 'write_text':
	options = args.options
	result = []
	
	for ch in options[0]:
		result.append(ch)
	getattr(device, 'orientation')(int(options[1]))
	getattr(device, 'invert')(int(options[2]))

	for idex, letter in enumerate(result):
		getattr(device, 'letter')(idex, ord(letter)) if (idex <= args.cascaded - 1) else False
		
# 		show_message: {
# 			text: 'hello world',
# 			scroll: 'left',
# 			invert: 0
# 		},
if args.method == 'show_message':
	options = args.options
	msg = options[0]
	scroll = options[1]
	# print scroll
	getattr(device, 'invert')(int(options[2]))
	getattr(device, 'show_message')(device, msg, scroll)
	# getattr(device, scroll)()
	# device.scroll_right()

# letter: {
# 			deviceId: 0,
# 			letter: 'A',
# 			orientation: 0,
# 			invert: 0
# 		},
if args.method == 'letter':
	options = args.options

	result = []
	for ch in options[1]:
		result.append(ch)
	getattr(device, 'orientation')(int(options[2]))
	getattr(device, 'invert')(int(options[3]))
	deviceId = options[0]
	# print(result[0])
	# print( str(result[0]) )
	print('letter display SINGLE letter at deviceId') if len(result) else False
	getattr(device, 'letter')( int(deviceId), ord(result[0]) )
