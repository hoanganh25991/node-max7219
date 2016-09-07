#!/usr/bin/env python
import max7219.led as led
import time
from max7219.font import proportional, SINCLAIR_FONT, TINY_FONT, CP437_FONT
# from random import randrange

# device = led.matrix(cascaded=1)
device = led.matrix(cascaded=18,vertical=True)
# device.orientation(180);
device.show_message("MAX7219 LED Matrix Demo", font=proportional(CP437_FONT))
def main(argv):
	message = ''
	brightness = 1
	cascade = 4
	try:
		opts, args = getopt.getopt(argv,"hm:b:",["message=","brightness="])
	except getopt.GetoptError:
		print 'matrix_single.py -m <message> -b <brightness 1-16>'
		sys.exit(2)
	for opt, arg in opts:
		if opt == '-h':
			print 'matrix_single.py -m <message> -b <brightness 1-16>'
			sys.exit()
		elif opt in ("-m", "--message"):
			message = arg
		elif opt in ("-b", "--brightness"):
			brightness = arg
		elif opt in ("-c", "--cascade"):
			cascade = arg
	print 'Message is ', message
	print 'Brightness is ', brightness
	print 'Cascade is ', cascade
	
	device = led.matrix(cascaded=cascade, vertical=True)
	# device = led.sevensegment(cascaded=cascade, vertical=True)
	device.brightness(brightness)
	device.show_message(message, font=proportional(CP437_FONT))


if __name__ == "__main__":
	main(sys.argv[1:])