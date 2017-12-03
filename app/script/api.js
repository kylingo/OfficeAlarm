// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// 普通通知
const normalNotification = {
    title: '基本通知',
    body: '短消息部分'
}
const normalNotificationButton = document.getElementById('basic-noti')
normalNotificationButton.addEventListener('click', function () {
    const myNotification = new window.Notification(normalNotification.title, normalNotification)
    // lambda
    myNotification.onclick = () => {
        console.log('Notification clicked')
    }

    myNotification.onclick = function () {
        console.log('Notification clicked')
    }
})

// 附带图像的通知
const path = require('path')
const advancedNotification = {
    title: '附带图像的通知',
    body: '短消息附带自定义图片',
    icon: path.join(__dirname, './img/icon/icon_app.icns')
}
const advancedNotificationButton = document.getElementById('advanced-noti')
advancedNotificationButton.addEventListener('click', function () {
    const myNotification = new window.Notification(advancedNotification.title, advancedNotification)

    myNotification.onclick = function () {
        console.log('Notification clicked')
    }
})

// 创建一个新窗口
const BrowserWindow = require('electron').remote.BrowserWindow
const newWindowBtn = document.getElementById('new-window')
newWindowBtn.addEventListener('click', function () {
    openWindow()
})

// 打开窗口
function openWindow() {
    const modalPath = path.join('file://', __dirname, './../section/alarm.html')
    let win = new BrowserWindow({width: window.screen.width, height: window.screen.height})
    win.on('close', function () {
        win = null
    })
    win.loadURL(modalPath)
    win.show()
}

// 打开全屏窗口
function openFullWindow(url) {
    const modalPath = path.join('file://', __dirname, url)
    let win = new BrowserWindow({width: window.screen.width, height: window.screen.height})
    win.on('close', function () {
        win = null
    })
    win.loadURL(modalPath)
    win.show()
}

// 打开一个不见得窗口
const newGongWindowBtn = document.getElementById('new-gone-window')
newGongWindowBtn.addEventListener('click', function () {
    // frame: false代表无框窗体; transparent: true 透明
    let win = new BrowserWindow({width: 600, height: 400, show: false})
    win.on('close', function () {
        win = null
    })
    win.show()
})

// 定时器
const newTimerBtn = document.getElementById('btn-timer')
newTimerBtn.addEventListener('click', function () {
    setTimeout(function () {
        // alert("timer 5s")
        openAlarmWindow()
    }, 5000)
})

// 打开闹钟页面
function openAlarmWindow() {
    openFullWindow("../section/alarm.html")
}

// 闹钟
const alarmBtn = document.getElementById('btn-alarm')
const alarmHourInput = document.getElementById('input-alarm-hour')
const alarmMinuteInput = document.getElementById('input-alarm-minute')
alarmBtn.addEventListener('click', function () {
    if (alarmHourInput.value == "") {
        alert("请输入小时")
        return
    } else if (isNaN(Number(alarmHourInput.value))) {
        alert("请输入小时数字")
        return
    } else {
        const hourNum = Number(alarmHourInput.value)
        if (hourNum < 0 || hourNum > 24) {
            alert("请输入0~24小时")
            return
        }
    }

    if (alarmMinuteInput.value == "") {
        alert("请输入分钟")
        return
    } else if (isNaN(Number(alarmMinuteInput.value))) {
        alert("请输入分钟数字")
        return
    } else {
        const minuteNum = Number(alarmMinuteInput.value)
        if (minuteNum < 0 || minuteNum > 60) {
            alert("请输入0~60分钟")
            return
        }
    }

    // 闹钟时间
    let alarmHour = Number(alarmHourInput.value)
    const alarmMinute = Number(alarmMinuteInput.value)

    // 当前时间
    const date = new Date()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    // 比较闹钟时间和当前时间
    if (alarmHour <= hour && alarmMinute <= minute) {
        // 比当前时间小的话，加24小时
        alarmHour = alarmHour + 24
    }

    // 闹钟响起的时间
    const totalMinute = (alarmHour - hour) * 60 + alarmMinute - minute
    const nextHour = parseInt(totalMinute / 60)
    const nextMinute = totalMinute % 60
    alert("闹钟将在 " + nextHour + "小时" + nextMinute + "分钟后响起")

    const totalTime = (totalMinute * 60 - second) * 1000
    setTimeout(function () {
        // alert("叮叮叮")
        openAlarmWindow()
    }, totalTime)
})
