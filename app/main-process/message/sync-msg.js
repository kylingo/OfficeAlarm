const {ipcMain} = require('electron')

ipcMain.on('synchronous-message', (event, arg) => {
    event.returnValue = '主进程收到同步消息'
})