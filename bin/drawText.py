#!/usr/bin/env python
import max7219.led as led
import time
from max7219.font import proportional, SINCLAIR_FONT, TINY_FONT, CP437_FONT

import argparse

parser = argparse.ArgumentParser()
parser.add_argument('--device', help='string, sevensegment or matrix', type=str, default='sevensegment')
parser.add_argument('--message', help='string, "hello world"', type=str, default='hello world')
parser.add_argument('--cascaded', help='integer, how many devices concated', type=int, default=1)
parser.add_argument('--brightness', help='integer from 1 to 16', type=int, default=7)
parser.add_argument('--vertical', help='boolean, device concated in which direction', type=bool, default=False)
args = parser.parse_args()

device = led.sevensegment(
    cascaded    =   args.cascaded,
    vertical    =   args.vertical
)

# this is how to call a function from string|variable
# brightness = getattr(device, args.brightness)
# brightness()
getattr(device, 'brightness')(args.brightness)

device.show_message(args.message)