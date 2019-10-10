const {
    app,
    dialog,
    globalShortcut
} = require('electron')

app.on('ready', () => {
    globalShortcut.register('Command+Alt+J', () => {
        dialog.showMessageBox({
            type: 'info',
            message: '成功',
            detail: '你按下一个全局快捷键Command+Alt+J',
            buttons: ['好的']
        })
    })
})

app.on('will-quit', () => {
    globalShortcut.unregisterAll()
})