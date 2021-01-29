input.onButtonPressed(Button.A, function () {
    fram.write8(1, 12)
    basic.pause(100)
    serial.writeLine("FRAM at 0x0: " + ("" + fram.read8(1)))
})
fram.begin()
