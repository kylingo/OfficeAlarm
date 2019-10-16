const {ipcRenderer} = require('electron')

const selectedDirBtn = document.getElementById('select-directory')

selectedDirBtn.addEventListener('click', () => {
    ipcRenderer.send('open-file-dialog')
})

ipcRenderer.on('selected-directory', (event, path) => {
    alert(`你选择了：${path}`)
})

