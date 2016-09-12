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
# args.vertical=False
# print args.vertical
# device = led.sevensegment(cascaded=2)

# device = getattr(led, args.device)(cascaded=args.cascaded, vertical=args.vertical)
device = getattr(led, args.device)(cascaded=args.cascaded, vertical=args.vertical)

# device = led.sevensegment(
#     cascaded    =   args.cascaded,
#     vertical    =   args.vertical
# )



# this is how to call a function from string|variable
# brightness = getattr(device, args.brightness)
# brightness()
getattr(device, 'brightness')(args.brightness)

device.show_message(args.message)
