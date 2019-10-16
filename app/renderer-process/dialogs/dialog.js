const {ipcRenderer} = require('electron')

const errorBtn = document.getElementById('error-dialog')
errorBtn.addEventListener('click', () => {
    ipcRenderer.send('open-error-dialog')
})

const infoBtn = document.getElementById('info-dialog')
infoBtn.addEventListener('click', () => {
    ipcRenderer.send('open-info-dialog')
})

ipcRenderer.on('info-dialog-selection', (event, index) => {
    let message = "你已选择 "
    if (index === 0) message += "是"
    else message += "否"
    alert(message)
})