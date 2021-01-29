// Add your code here
enum OPCODES {
    OPCODE_READ = 3,
    OPCODE_WRITE = 2,
    OPCODE_RDID = 159,
    OPCODE_WREN = 6
}
//% color=190 weight=100 icon="\uf1ec"
//% advanced=true
namespace fram {
    //% block
    export function begin() {
        pins.digitalWritePin(DigitalPin.P16, 1)
        pins.spiPins(DigitalPin.P15, DigitalPin.P14, DigitalPin.P13)
        pins.spiFormat(8, 0)
        pins.spiFrequency(1000000)
        fram.getDeviceID()
        fram.write_enable()
    }
    //% block
    export function write8(addr: number, val: number) {
        pins.digitalWritePin(DigitalPin.P16, 0)
        pins.spiWrite(OPCODES.OPCODE_WRITE)
        pins.spiWrite(addr >> 8)
        pins.spiWrite(addr & 0xff)
        pins.spiWrite(val)
        pins.digitalWritePin(DigitalPin.P16, 1)
    }
    //% block
    export function getDeviceID () {
        let whoami = 0
        let wh0 = 0
        let wh1 = 0
        let wh2 = 0
        let wh3 = 0
        pins.digitalWritePin(DigitalPin.P16, 0)
        whoami = pins.spiWrite(OPCODES.OPCODE_RDID)
        wh0 = pins.spiWrite(255)
        wh1 = pins.spiWrite(255)
        wh2 = pins.spiWrite(255)
        wh3 = pins.spiWrite(255)
        pins.digitalWritePin(DigitalPin.P16, 1)
        serial.writeLine("WHOAMI: " + ("" + whoami) + " wh0:" + ("" + wh0) + " wh1:" + ("" + wh1) + " wh2:" + ("" + wh2) + " wh3:" + ("" + wh3))
        if (wh1 == 127) {
            serial.writeLine("FRAM Connected")
        } else {
            serial.writeLine("ERR: FRAM not Connected")
        }
    }
    //% block
    export function write_enable() {
        pins.digitalWritePin(DigitalPin.P16, 0)
        let wh3 = pins.spiWrite(OPCODES.OPCODE_WREN)
        pins.digitalWritePin(DigitalPin.P16, 1)
        serial.writeLine("FRAM Writes Enabled")
    }
    //% block
    export function read8 (addr: number) {
        pins.digitalWritePin(DigitalPin.P16, 0)
        pins.spiWrite(OPCODES.OPCODE_READ)
        pins.spiWrite(addr >> 8)
        pins.spiWrite(addr & 0xff)
        let wh3 = pins.spiWrite(255)
        pins.digitalWritePin(DigitalPin.P16, 1)
        return wh3
    }
}