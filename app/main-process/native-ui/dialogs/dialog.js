const {ipcMain, dialog} = require('electron')

ipcMain.on('open-error-dialog', () => {
    dialog.showErrorBox('错误信息标题', '错误信息内容')
})

ipcMain.on('open-info-dialog', (event) => {
    const options = {
        type: 'info',
        title: '信息',
        message: '这条信息还可以不咯？',
        buttons: ['是', '否']
    }

    dialog.showMessageBox(options, (index) => {
        event.sender.send('info-dialog-selection', index)
    })
})