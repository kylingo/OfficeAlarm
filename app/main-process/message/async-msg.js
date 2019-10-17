const {ipcMain} = require('electron')

ipcMain.on('asynchronous-message', (event, arg) => {
    event.sender.send('asynchronous-reply', `主进程收到消息：${arg}`)
})