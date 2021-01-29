def framread8(addr: number):
    global wh3
    pins.digital_write_pin(DigitalPin.P16, 0)
    pins.spi_write(OPCODE_READ)
    pins.spi_write(addr >> 8)
    pins.spi_write(addr & 0xff)
    wh3 = pins.spi_write(255)
    pins.digital_write_pin(DigitalPin.P16, 1)
    return wh3

def on_button_pressed_a():
    framwrite8(0, 10)
    basic.pause(100)
    serial.write_line("FRAM at 0xFF: " + ("" + str(framread8(0))))
input.on_button_pressed(Button.A, on_button_pressed_a)

def framwrite8(addr: number, val: number):
    pins.digital_write_pin(DigitalPin.P16, 0)
    pins.spi_write(OPCODE_WRITE)
    pins.spi_write(addr >> 8)
    pins.spi_write(addr & 0xff)
    pins.spi_write(val)
    pins.digital_write_pin(DigitalPin.P16, 1)
def framgetDeviceID():
    global whoami, wh0, wh1, wh2, wh3
    pins.digital_write_pin(DigitalPin.P16, 0)
    whoami = pins.spi_write(OPCODE_RDID)
    wh0 = pins.spi_write(255)
    wh1 = pins.spi_write(255)
    wh2 = pins.spi_write(255)
    wh3 = pins.spi_write(255)
    pins.digital_write_pin(DigitalPin.P16, 1)
    serial.write_line("WHOAMI: " + ("" + str(whoami)) + " wh0:" + ("" + str(wh0)) + " wh1:" + ("" + str(wh1)) + " wh2:" + ("" + str(wh2)) + " wh3:" + ("" + str(wh3)))
    if wh1 == 127:
        serial.write_line("FRAM Connected")
wh2 = 0
wh1 = 0
wh0 = 0
whoami = 0
wh3 = 0
OPCODE_RDID = 0
OPCODE_READ = 3
OPCODE_WRITE = 2
OPCODE_RDID = 159
OPCODE_WREN = 6
pins.digital_write_pin(DigitalPin.P16, 1)
pins.spi_pins(DigitalPin.P15, DigitalPin.P14, DigitalPin.P13)
pins.spi_format(8, 0)
pins.spi_frequency(1000000)
framgetDeviceID()