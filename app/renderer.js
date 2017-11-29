// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// 通知
const notification = {
    title: '基本通知',
    body: '短消息部分'
}
const notificationButton = document.getElementById('basic-noti')

notificationButton.addEventListener('click', function () {
    const myNotification = new window.Notification(notification.title, notification)

    myNotification.onclick = () => {
        console.log('Notification clicked')
    }
})