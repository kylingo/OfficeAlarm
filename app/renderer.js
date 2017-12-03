// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// 全局变量
const path = require('path')
const BrowserWindow = require('electron').remote.BrowserWindow

// 变量定义
const inputWorkStart = document.getElementById('input-work-start-hour')
const inputWorkEnd = document.getElementById('input-work-end-hour')
const inputRemindMinute = document.getElementById('input-work-remind-minute')

const inputLunchHour = document.getElementById('input-lunch-hour')
const inputLunchMinute = document.getElementById('input-lunch-minute')

const inputDinnerHour = document.getElementById('input-dinner-hour')
const inputDinnerMinute = document.getElementById('input-dinner-minute')

// 恢复数据
restoreInput()

// 检查休息提醒
function checkRestTime(hour, minute, second) {
    const workStartHour = Number(inputWorkStart.value)
    const workEndHour = Number(inputWorkEnd.value)
    const remindMinute = Number(inputRemindMinute.value)
    if (minute == remindMinute && second == 0) {
        if (hour >= workStartHour && hour <= workEndHour) {
            console.log("hour:" + hour + " minute:" + minute + " second:" + second +
                " remindMinute:" + remindMinute)
            openAlarmWindow()
        } else {
            console.log("checkRestTime hour:" + hour + " not in work time:" + workStartHour + "~" + workEndHour)
        }
    }
}

// 检查午饭提醒
function checkLunchTime(hour, minute, second) {
    const lunchHour = Number(inputLunchHour.value)
    const lunchMinute = Number(inputLunchMinute.value)
    if (hour == lunchHour && minute == lunchMinute && second == 0) {
        console.log("current time:" + hour + ":" + minute + ":" + second +
            " lunch time:" + lunchHour + ":" + lunchMinute)
        openLunchWindow()
    }
}

// 检查晚饭提醒
function checkDinnerTime(hour, minute, second) {
    const dinnerHour = Number(inputDinnerHour.value)
    const dinnerMinute = Number(inputDinnerMinute.value)
    if (hour == dinnerHour && minute == dinnerMinute && second == 0) {
        console.log("current time:" + hour + ":" + minute + ":" + second +
            " dinner time:" + dinnerHour + ":" + dinnerMinute)
        openDinnerWindow()
    }
}

// 更新当前时间
const spanCurTime = document.getElementById("span-current-time")
updateTime()
setInterval(updateTime, 1000)

function updateTime() {
    const date = new Date()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    spanCurTime.innerHTML = formatTime(hour) + ":" + formatTime(minute) + ":" + formatTime(second)

    // 检查提醒
    checkRestTime(hour, minute, second)
    checkLunchTime(hour, minute, second)
    checkDinnerTime(hour, minute, second)
}

function formatTime(time) {
    if (time < 10) {
        time = "0" + time
    }
    return time
}

// 修改参数
const btnConfirm = document.getElementById('btn-alarm-confirm')
btnConfirm.style.color = 'blue'
btnConfirm.style.fontSize = 'middle'
btnConfirm.style.padding = '5px'
btnConfirm.style.marginLeft = '50px'
btnConfirm.addEventListener('click', function () {
    saveInput()
    alert("修改成功")
})

// 保存数据
function saveInput() {
    saveItem(inputWorkStart)
    saveItem(inputWorkEnd)
    saveItem(inputRemindMinute)
    saveItem(inputLunchHour)
    saveItem(inputLunchMinute)
    saveItem(inputDinnerHour)
    saveItem(inputDinnerMinute)
}

// 恢复数据
function restoreInput() {
    restoreItem(inputWorkStart)
    restoreItem(inputWorkEnd)
    restoreItem(inputRemindMinute)
    restoreItem(inputLunchHour)
    restoreItem(inputLunchMinute)
    restoreItem(inputDinnerHour)
    restoreItem(inputDinnerMinute)
}

function saveItem(inputElement) {
    localStorage.setItem(inputElement.id, inputElement.value)
}

function restoreItem(inputElement) {
    const value = localStorage.getItem(inputElement.id)
    if (value != null) {
        inputElement.value = value
    }
}

// 接口测试
const btnApi = document.getElementById('btn-api')
btnApi.style.visibility = 'hidden'
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