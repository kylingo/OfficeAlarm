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
newWindowBtn.addEventListener('click', function (event) {
    const modalPath = path.join('file://', __dirname, './test.html')
    let win = new BrowserWindow({ width: 600, height: 400 })
    win.on('close', function () { win = null })
    win.loadURL(modalPath)
    win.show()
})


// 打开一个不见得窗口
const newGongWindowBtn = document.getElementById('new-gone-window')
newGongWindowBtn.addEventListener('click', function (event) {
    // frame: false代表无框窗体; transparent: true 透明
    let win = new BrowserWindow({ width: 600, height: 400, show: false})
    win.on('close', function () { win = null })
    win.show()
})
