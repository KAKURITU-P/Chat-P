enum RadioMessage {
    message1 = 49434
}
input.onPinPressed(TouchPin.P0, function () {
    o = 0
    ぱけかうんた = 0
    while (o == 0) {
        if (送信用文字.length - ぱけかうんた < 18) {
            radio.sendString("//" + 送信用文字.substr(ぱけかうんた, 18))
            o = 1
        } else {
            radio.sendString(送信用文字.substr(ぱけかうんた, 18))
            ぱけかうんた += 18
        }
        basic.pause(100)
    }
    カナ文字 = ""
    カナ文字_メモリ = ""
    送信用文字 = ""
    basic.showLeds(`
        # . # . .
        # . # # #
        . # # . #
        . . # # #
        . . # . .
        `)
    basic.clearScreen()
    katakana.showString("ｱｶｻﾀﾅﾊﾏﾔﾗﾜｬｧ".substr(文字セレクター, 1))
})
datalogger.onLogFull(function () {
    datalogger.deleteLog(datalogger.DeleteType.Fast)
})
// 初期設定(リセット)
input.onButtonPressed(Button.A, function () {
    if (1 == サウンドonoff) {
        music.setBuiltInSpeakerEnabled(false)
        サウンドonoff = 0
        basic.showLeds(`
            # . # . .
            . # # . .
            . . # . .
            # # # # .
            # # # . #
            `)
    } else {
        music.setBuiltInSpeakerEnabled(true)
        サウンドonoff = 1
        basic.showLeds(`
            . . # . .
            . . # . .
            . . # . .
            # # # . .
            # # # . .
            `)
    }
    basic.clearScreen()
    katakana.showString("ｱｶｻﾀﾅﾊﾏﾔﾗﾜｬｧ".substr(文字セレクター, 1))
})
input.onPinPressed(TouchPin.P2, function () {
    if (入力カウンター2 == 0) {
        送信用文字_メモリ = "" + 送信用文字 + "AKSTNHMYRWLX0".substr(文字セレクター, 1)
        送信用文字 = 送信用文字_メモリ
        入力カウンター2 = 1
    } else {
        basic.clearScreen()
        basic.pause(200)
        if (文字セレクター == 11) {
            送信用文字_メモリ = "" + 送信用文字 + "bcdfghjlpqrst".substr(子音セレクター, 1)
            送信用文字 = 送信用文字_メモリ
        } else if (文字セレクター == 12) {
            送信用文字_メモリ = "" + 送信用文字 + "1234567890".substr(子音セレクター, 1)
            送信用文字 = 送信用文字_メモリ
        } else {
            送信用文字_メモリ = "" + 送信用文字 + "aiueo".substr(子音セレクター, 1)
            送信用文字 = 送信用文字_メモリ
        }
        入力カウンター2 = 0
        子音セレクター = 0
    }
    katakana.showString("ｱｶｻﾀﾅﾊﾏﾔﾗﾜｬｧ1".substr(文字セレクター, 1))
})
input.onButtonPressed(Button.AB, function () {
    復号化用カウンター = 0
    カナ文字_受信時 = ""
    カナ文字_受信時メモリ = ""
    while (送信用文字.length / 2 > 受信文字数カウンター) {
        復号化用カウンター = "AaAiAuAeAoKaKiKuKeKoSaSiSuSeSoTaTiTuTeToNaNiNuNeNoHaHiHuHeHoMaMiMuMeMoYaYuYoRaRiRuReROWaWiWuLaLiLuLeXbXcXdXfXgXhXjXlXpXqXrXsXt01020304050607080900".indexOf(送信用文字.substr(受信文字数カウンター * 2, 2))
        カナ文字_受信時 = "" + カナ文字_受信時メモリ + "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｬｭｮｯｧｨｩｪｫ!?_-｡､ﾞﾟ1234567890".charAt(復号化用カウンター / 2)
        カナ文字_受信時メモリ = カナ文字_受信時
        受信文字数カウンター += 1
    }
    hyo2 = hyoujiyou
    hyoujiyou = "" + hyo2 + カナ文字_受信時
    katakana.showString(hyoujiyou)
    hyoujiyou = ""
    hyo2 = ""
    受信文字数カウンター = 0
    katakana.showString("ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｯｬｭｮｧｨｩｪｫ!?_-｡､ﾞﾟ".substr(文字セレクター, 1))
})
// メッセージ受信
// メッセージ複号化
radio.onReceivedString(function (receivedString) {
    datalogger.log(
    datalogger.createCV("DLmesege", receivedString),
    datalogger.createCV("Time", control.millis())
    )
    復号化用カウンター = 0
    カナ文字_受信時 = ""
    カナ文字_受信時メモリ = ""
    if (receivedString.includes("@@")) {
        music.stopAllSounds()
    } else {
        if (receivedString.includes("//")) {
            受信文字数カウンター = 1
            while (receivedString.length / 2 > 受信文字数カウンター) {
                復号化用カウンター = "AaAiAuAeAoKaKiKuKeKoSaSiSuSeSoTaTiTuTeToNaNiNuNeNoHaHiHuHeHoMaMiMuMeMoYaYuYoRaRiRuReRoWaWiWuLaLiLuLeXbXcXdXfXgXhXjXlXpXqXrXsXt01020304050607080900".indexOf(receivedString.substr(受信文字数カウンター * 2, 2))
                カナ文字_受信時 = "" + カナ文字_受信時メモリ + "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｬｭｮｯｧｨｩｪｫ!?_-｡､ﾞﾟ1234567890".charAt(復号化用カウンター / 2)
                カナ文字_受信時メモリ = カナ文字_受信時
                受信文字数カウンター += 1
            }
            hyo2 = hyoujiyou
            hyoujiyou = "" + hyo2 + カナ文字_受信時
            basic.pause(200)
            basic.showLeds(`
                # # . . .
                # . # . .
                # # . # .
                . . . # .
                . . . # #
                `)
            radio.sendString("@@")
            basic.clearScreen()
            music.play(music.createSoundExpression(
            WaveShape.Sine,
            2500,
            2500,
            255,
            255,
            100,
            SoundExpressionEffect.None,
            InterpolationCurve.Linear
            ), music.PlaybackMode.UntilDone)
            basic.pause(100)
            music.play(music.createSoundExpression(
            WaveShape.Sine,
            2500,
            2500,
            255,
            255,
            500,
            SoundExpressionEffect.None,
            InterpolationCurve.Linear
            ), music.PlaybackMode.UntilDone)
            basic.pause(2000)
            katakana.showString(hyoujiyou)
            basic.pause(1000)
            basic.clearScreen()
            katakana.showString("ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｯｬｭｮｧｨｩｪｫ!?_-｡､ﾞﾟ".substr(文字セレクター, 1))
            hyoujiyou = ""
            hyo2 = ""
        } else {
            while (receivedString.length / 2 > 受信文字数カウンター) {
                復号化用カウンター = "AaAiAuAeAoKaKiKuKeKoSaSiSuSeSoTaTiTuTeToNaNiNuNeNoHaHiHuHeHoMaMiMuMeMoYaYuYoRaRiRuReROWaWiWuLaLiLuLeXbXcXdXfXgXhXjXlXpXqXrXsXt".indexOf(receivedString.substr(受信文字数カウンター * 2, 2))
                カナ文字_受信時 = "" + カナ文字_受信時メモリ + "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｬｭｮｯｧｨｩｪｫ!?_-｡､ﾞﾟ".charAt(復号化用カウンター / 2)
                カナ文字_受信時メモリ = カナ文字_受信時
                受信文字数カウンター += 1
            }
            hyo2 = hyoujiyou
            hyoujiyou = "" + hyo2 + カナ文字_受信時
        }
    }
})
input.onButtonPressed(Button.B, function () {
    if (入力カウンター2 == 0) {
        送信用文字 = 送信用文字.substr(0, 送信用文字.length - 2)
    } else {
        送信用文字 = "" + 送信用文字 + "D"
        送信用文字 = 送信用文字.substr(0, 送信用文字.length - 2)
    }
})
input.onPinPressed(TouchPin.P1, function () {
    basic.clearScreen()
    if (入力カウンター2 == 0) {
        文字セレクター += 1
        if (文字セレクター >= 13) {
            文字セレクター = 0
        }
        katakana.showString("ｱｶｻﾀﾅﾊﾏﾔﾗﾜｬｧ1".substr(文字セレクター, 1))
    } else {
        basic.clearScreen()
        basic.pause(200)
        if (文字セレクター == 7) {
            if (子音セレクター >= 2) {
                子音セレクター = 0
            } else {
                子音セレクター += 1
            }
            katakana.showString("ﾔﾕﾖ".substr(子音セレクター, 1))
        } else if (文字セレクター == 9) {
            if (子音セレクター >= 2) {
                子音セレクター = 0
            } else {
                子音セレクター += 1
            }
            katakana.showString("ﾜｦﾝ".substr(子音セレクター, 1))
        } else if (文字セレクター == 10) {
            if (子音セレクター >= 3) {
                子音セレクター = 0
            } else {
                子音セレクター += 1
            }
            katakana.showString("ｬｭｮｯ".substr(子音セレクター, 1))
        } else if (文字セレクター == 11) {
            if (子音セレクター >= 14) {
                子音セレクター = 0
            } else {
                子音セレクター += 1
            }
            katakana.showString("ｧｨｩｪｫ!?_-｡､ﾞﾟ".substr(子音セレクター, 1))
        } else if (文字セレクター == 12) {
            if (子音セレクター >= 9) {
                子音セレクター = 0
            } else {
                子音セレクター += 1
            }
            katakana.showString("1234567890".substr(子音セレクター, 1))
        } else {
            if (子音セレクター >= 4) {
                子音セレクター = 0
            } else {
                子音セレクター += 1
            }
            katakana.showString("ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓ     ﾗﾘﾙﾚﾛ          ".substr(文字セレクター * 5 + 子音セレクター, 1))
        }
    }
})
let hyoujiyou = ""
let hyo2 = ""
let 受信文字数カウンター = 0
let カナ文字_受信時メモリ = ""
let カナ文字_受信時 = ""
let 復号化用カウンター = 0
let 子音セレクター = 0
let 送信用文字_メモリ = ""
let 入力カウンター2 = 0
let サウンドonoff = 0
let カナ文字_メモリ = ""
let カナ文字 = ""
let 送信用文字 = ""
let ぱけかうんた = 0
let o = 0
let 文字セレクター = 0
let 入力カウンター3 = 0
katakana.setScrollTime(150)
radio.setGroup(1001)
文字セレクター = 0
pins.touchSetMode(TouchTarget.LOGO, TouchTargetMode.Capacitive)
for (let index = 0; index < randint(1, 3); index++) {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        # . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        # # . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        # # # . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        # # # # .
        `)
}
basic.showLeds(`
    . . . # .
    # . # . .
    . # . . .
    . . . . .
    # # # # #
    `)
basic.clearScreen()
katakana.showString("ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｯｬｭｮｧｨｩｪｫ!?_-｡､ﾞﾟ".substr(文字セレクター, 1))
