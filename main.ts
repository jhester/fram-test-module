input.onButtonPressed(Button.A, function () {
    fram.write8(0, 11)
    basic.pause(100)
    serial.writeLine("FRAM at 0x0: " + ("" + fram.read8(0)))
})
fram.begin()
