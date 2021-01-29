function fram_write8 (addr: number, val: number) {
    pins.digitalWritePin(DigitalPin.P16, 0)
    pins.spiWrite(OPCODE_WRITE)
pins.spiWrite(addr >> 8)
pins.spiWrite(addr & 0xff)
pins.spiWrite(val)
pins.digitalWritePin(DigitalPin.P16, 1)
}
input.onButtonPressed(Button.A, function () {
    fram_write8(0, 10)
    basic.pause(100)
    serial.writeLine("FRAM at 0xFF: " + ("" + fram_read8(0)))
})
function fram_getDeviceID () {
    pins.digitalWritePin(DigitalPin.P16, 0)
    whoami = pins.spiWrite(OPCODE_RDID)
    wh0 = pins.spiWrite(255)
    wh1 = pins.spiWrite(255)
    wh2 = pins.spiWrite(255)
    wh3 = pins.spiWrite(255)
    pins.digitalWritePin(DigitalPin.P16, 1)
    serial.writeLine("WHOAMI: " + ("" + whoami) + " wh0:" + ("" + wh0) + " wh1:" + ("" + wh1) + " wh2:" + ("" + wh2) + " wh3:" + ("" + wh3))
    if (wh1 == 127) {
        serial.writeLine("FRAM Connected")
    }
}
function fram_write_enable () {
    pins.digitalWritePin(DigitalPin.P16, 0)
    wh3 = pins.spiWrite(OPCODE_WREN)
    pins.digitalWritePin(DigitalPin.P16, 1)
    serial.writeLine("FRAM Writes Enabled")
}
function fram_read8 (addr: number) {
    pins.digitalWritePin(DigitalPin.P16, 0)
    pins.spiWrite(OPCODE_READ)
pins.spiWrite(addr >> 8)
pins.spiWrite(addr & 0xff)
wh3 = pins.spiWrite(255)
    pins.digitalWritePin(DigitalPin.P16, 1)
    return wh3
}
let wh3 = 0
let wh2 = 0
let wh1 = 0
let wh0 = 0
let whoami = 0
let OPCODE_WREN = 0
let OPCODE_RDID = 0
let OPCODE_READ = 3
let OPCODE_WRITE = 2
OPCODE_RDID = 159
OPCODE_WREN = 6
pins.digitalWritePin(DigitalPin.P16, 1)
pins.spiPins(DigitalPin.P15, DigitalPin.P14, DigitalPin.P13)
pins.spiFormat(8, 0)
pins.spiFrequency(1000000)
fram_getDeviceID()
fram_write_enable()
