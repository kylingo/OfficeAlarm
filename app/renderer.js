// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// 全局变量
const path = require('path')
const BrowserWindow = require('electron').remote.BrowserWindow

// 确认
const btnConfirm = document.getElementById('btn-alarm-confirm')
btnConfirm.addEventListener('click', function () {
    cancelAlarm()
    applyAlarm()
})

// 打开页面时，默认加载一次
let lunchAlarm
let dinnerAlarm
let countDownLunch
let countDownDinner

let spanLunchError
let spanDinnerError

applyAlarm()
function applyAlarm() {
    applyLunch()
    applyDinner()
}

function cancelAlarm() {
    countDownLunch = -1
    countDownDinner = -1

    if (lunchAlarm != null) {
        console.log("clear lunch timeout")
        clearTimeout(lunchAlarm)
    }

    if (dinnerAlarm != null) {
        console.log("clear dinner timeout")
        clearTimeout(dinnerAlarm)
    }
}

function applyLunch() {
    const inputLunchHour = document.getElementById('input-lunch-hour')
    const inputLunchMinute = document.getElementById('input-lunch-minute')
    spanLunchError = document.getElementById('span-lunch-error')
    const result = applyEatAlarm(inputLunchHour.value, inputLunchMinute.value, function (timeout) {
        lunchAlarm = setTimeout(function () {
            openLunchWindow()
        }, timeout)
        countDownLunch = timeout / 1000
    })

    if (result == false) {
        spanLunchError.innerHTML = '输入有误'
        spanLunchError.style.color = 'red'
        spanDinnerError.style.fontSize = 'middle'
        countDownLunch = -1
    } else {
        spanLunchError.innerHTML = ''
        spanLunchError.style.color = 'blue'
        spanLunchError.style.fontSize = 'middle'
    }
}

function updateLunchCountDown() {
    if (countDownLunch > 0) {
        countDownLunch--
        const nextSecond = countDownLunch % 60
        const totalMinute = parseInt(countDownLunch / 60)
        const nextHour = parseInt(totalMinute / 60)
        const nextMinute = totalMinute % 60

        spanLunchError.innerHTML = ' 倒计时：' + checkTime(nextHour) + ":" +
            checkTime(nextMinute) + ":" + checkTime(nextSecond)
    } else {
        spanLunchError.innerHTML = ''
    }
}

function applyDinner() {
    const inputDinnerHour = document.getElementById('input-dinner-hour')
    const inputDinnerMinute = document.getElementById('input-dinner-minute')
    spanDinnerError = document.getElementById('span-dinner-error')
    const result = applyEatAlarm(inputDinnerHour.value, inputDinnerMinute.value, function (timeout) {
        dinnerAlarm = setTimeout(function () {
            openDinnerWindow()
        }, timeout)
        countDownDinner = timeout / 1000
    })

    if (result == false) {
        spanDinnerError.innerHTML = '输入有误'
        spanDinnerError.style.color = 'red'
        spanDinnerError.style.fontSize = 'middle'
        countDownDinner = -1
    } else {
        spanDinnerError.innerHTML = ''
        spanDinnerError.style.color = 'blue'
        spanDinnerError.style.fontSize = 'middle'
    }
}

function updateDinnerCountDown() {
    if (countDownDinner > 0) {
        countDownDinner--
        const nextSecond = countDownDinner % 60
        const totalMinute = parseInt(countDownDinner / 60)
        const nextHour = parseInt(totalMinute / 60)
        const nextMinute = totalMinute % 60

        spanDinnerError.innerHTML = ' 倒计时：' + checkTime(nextHour) + ":" +
            checkTime(nextMinute) + ":" + checkTime(nextSecond)
    } else {
        spanDinnerError.innerHTML = ''
    }
}

function applyEatAlarm(alarmHourValue, alarmMinuteValue, callback) {
    let alarmHour = Number(alarmHourValue)
    const alarmMinute = Number(alarmMinuteValue)

    if (isNaN(alarmHour)) {
        return false
    } else {
        if (alarmHour < 0 || alarmHour > 24) {
            return false
        }
    }

    if (isNaN(alarmMinute)) {
        return false
    } else {
        if (alarmMinute < 0 || alarmMinute > 60) {
            return false
        }
    }

    // 当前时间
    const date = new Date()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    // 比较闹钟时间和当前时间
    if ((alarmHour * 60 + alarmMinute) <= (hour * 60 + minute)) {
        // 比当前时间小的话，加24小时
        alarmHour = alarmHour + 24
    }

    // 闹钟响起的时间
    const totalMinute = (alarmHour - hour) * 60 + alarmMinute - minute
    // const nextHour = parseInt(totalMinute / 60)
    // const nextMinute = totalMinute % 60
    // alert("闹钟将在 " + nextHour + "小时" + nextMinute + "分钟后响起")

    // 回调闹钟
    const totalTime = (totalMinute * 60 - second) * 1000
    callback(totalTime)
    return true
}

// 检查提醒
const inputWorkStart = document.getElementById('input-work-start-hour')
const inputWorkEnd = document.getElementById('input-work-end-hour')
const inputRemindMinute = document.getElementById('input-work-remind-minute')
const workStartHour = Number(inputWorkStart.value)
const workEndHour = Number(inputWorkEnd.value)
const remindMinute = Number(inputRemindMinute.value)
function checkRestTime(hour, minute, second) {
    // console.log("hour:" + hour + " minute:" + minute + " second:" + second + " remindMinute:" + remindMinute)
    if (minute == remindMinute && second == 0) {
        if (hour >= workStartHour && hour <= workEndHour) {
            console.log("openAlarmWindow")
            openAlarmWindow()
        } else {
            console.log("checkRestTime hour:" + hour + "not in" + workStartHour + "~" + workEndHour)
        }
    }
}

// 当前时间
const spanCurTime = document.getElementById("span-current-time")
updateTime()
setInterval(updateTime, 1000)

function updateTime() {
    updateCurrentTime()
    updateLunchCountDown()
    updateDinnerCountDown()
}

function updateCurrentTime() {
    const date = new Date()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    spanCurTime.innerHTML = checkTime(hour)+ ":" + checkTime(minute)+ ":" + checkTime(second)

    // 检查是否提醒
    checkRestTime(hour, minute, second)
}

function checkTime(time) {
    if (time < 10) {
        time = "0" + time
    }
    return time
}

// 接口测试
const btnApi = document.getElementById('btn-api')
btnApi.addEventListener('click', function () {
    openApiWindow()
})

function openApiWindow() {
    openWindow('./section/api.html')
}

function openAlarmWindow() {
    openWindow('./section/alarm.html')
}

function openLunchWindow() {
    openFullWindow('./section/lunch.html')
}

function openDinnerWindow() {
    openFullWindow('./section/dinner.html')
}

// 打开窗口
function openWindow(url, width, height) {
    const modalPath = path.join('file://', __dirname, url)
    if (!isNaN(Number(width))) {
        width = 600
    }
    if (!isNaN(Number(height))) {
        height = 400
    }
    let win = new BrowserWindow({width: width, height: height})
    win.on('close', function () {
        win = null
    })
    win.loadURL(modalPath)
    win.show()
}

function openFullWindow(url) {
    const modalPath = path.join('file://', __dirname, url)
    let win = new BrowserWindow({width: window.screen.width, height: window.screen.height})
    win.on('close', function () {
        win = null
    })
    win.loadURL(modalPath)
    win.show()
}