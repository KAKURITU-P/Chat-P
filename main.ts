enum RadioMessage {
    message1 = 49434
}
datalogger.onLogFull(function () {
    datalogger.deleteLog(datalogger.DeleteType.Fast)
})
// 初期設定(リセット)
input.onButtonPressed(Button.A, function () {
    basic.clearScreen()
    if (入力カウンター2 == 0) {
        文字セレクター += 1
        if (文字セレクター >= 12) {
            文字セレクター = 0
        }
        katakana.showString("ｱｶｻﾀﾅﾊﾏﾔﾗﾜｬｧ".substr(文字セレクター, 1))
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
// メッセージ保存
// メッセージ暗号化
input.onButtonPressed(Button.AB, function () {
    o = 0
    ぱけかうんた = 0
    while (o == 0) {
        if (送信用文字.length - ぱけかうんた < 18) {
            radio.sendString("//" + 送信用文字.substr(ぱけかうんた, 19))
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
    送信済 = 1
})
// メッセージ受信
// メッセージ複号化
radio.onReceivedString(function (receivedString) {
    datalogger.log(
    datalogger.createCV("mesege", receivedString),
    datalogger.createCV("Time", control.millis())
    )
    basic.clearScreen()
    復号化用カウンター = 0
    カナ文字_受信時 = ""
    カナ文字_受信時メモリ = ""
    受信文字数カウンター = 0
    if (receivedString.includes("//")) {
        受信文字数カウンター = 1
        while (receivedString.length / 2 > 受信文字数カウンター) {
            復号化用カウンター = "AaAiAuAeAoKaKiKuKeKoSaSiSuSeSoTaTiTuTeToNaNiNuNeNoHaHiHuHeHoMaMiMuMeMoYaYuYoRaRiRuReROWaWiWuLaLiLuLeXbXcXdXfXgXhXjXlXpXqXrXsXt".indexOf(receivedString.substr(受信文字数カウンター * 2, 2))
            カナ文字_受信時 = "" + カナ文字_受信時メモリ + "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｬｭｮｯｧｨｩｪｫ!?_-｡､ﾞﾟ".charAt(復号化用カウンター / 2)
            カナ文字_受信時メモリ = カナ文字_受信時
            受信文字数カウンター += 1
        }
        hyo2 = hyoujiyou
        hyoujiyou = "" + hyo2 + カナ文字_受信時
        basic.pause(200)
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
})
input.onButtonPressed(Button.B, function () {
    if (入力カウンター2 == 0) {
        送信用文字_メモリ = "" + 送信用文字 + "AKSTNHMYRWLX".substr(文字セレクター, 1)
        送信用文字 = 送信用文字_メモリ
        入力カウンター2 = 1
    } else {
        basic.clearScreen()
        basic.pause(200)
        if (文字セレクター == 11) {
            送信用文字_メモリ = "" + 送信用文字 + "bcdfghjlpqrst".substr(子音セレクター, 1)
            送信用文字 = 送信用文字_メモリ
        } else {
            送信用文字_メモリ = "" + 送信用文字 + "aiueo".substr(子音セレクター, 1)
            送信用文字 = 送信用文字_メモリ
        }
        入力カウンター2 = 0
        子音セレクター = 0
    }
    katakana.showString("ｱｶｻﾀﾅﾊﾏﾔﾗﾜｬｧ".substr(文字セレクター, 1))
})
let 送信用文字_メモリ = ""
let hyoujiyou = ""
let hyo2 = ""
let 受信文字数カウンター = 0
let カナ文字_受信時メモリ = ""
let カナ文字_受信時 = ""
let 復号化用カウンター = 0
let 送信済 = 0
let カナ文字_メモリ = ""
let カナ文字 = ""
let 送信用文字 = ""
let ぱけかうんた = 0
let o = 0
let 子音セレクター = 0
let 入力カウンター2 = 0
let 文字セレクター = 0
let 入力カウンター3 = 0
katakana.setScrollTime(100)
radio.setGroup(1001)
文字セレクター = 0
katakana.showString("ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｯｬｭｮｧｨｩｪｫ!?_-｡､ﾞﾟ".substr(文字セレクター, 1))
pins.touchSetMode(TouchTarget.LOGO, TouchTargetMode.Capacitive)
