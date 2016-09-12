#!/usr/bin/env python
import max7219.led as led
import time
from max7219.font import proportional, SINCLAIR_FONT, TINY_FONT, CP437_FONT

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

device = getattr(led, args.device)(cascaded=args.cascaded, vertical=args.vertical)

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
	scroll = 'scroll_' + options[1]
	getattr(device, 'show_message')(msg)
	getattr(device, scroll)()

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
