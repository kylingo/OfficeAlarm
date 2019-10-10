const {
    BrowserWindow,
    Menu,
    MenuItem,
    ipcMain,
    app
} = require('electron')

// 上下文菜单
const menu = new Menu()
menu.append(new MenuItem({label:'菜单1'}))
menu.append(new MenuItem({type: 'separator'}))
menu.append(new MenuItem({label: '菜单2'}))
menu.append(new MenuItem({label: '菜单3', type: 'checkbox', checked: true}))

app.on('browser-window-created', function (event, win) {
    win.webContents.on('context-menu', function (e, params) {
        menu.popup(win, params.x, params.y)
    })
})

ipcMain.on('show-context-menu', function (event) {
    const win = BrowserWindow.fromWebContents(event.sender)
    menu.popup(win)
})