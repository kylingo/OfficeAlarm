const {ipcRenderer} = require('electron')

const selectedDirBtn = document.getElementById('select-directory')

selectedDirBtn.addEventListener('click', () => {
    ipcRenderer.send('open-file-dialog')
})

ipcRenderer.on('selected-directory', (event, path) => {
    document.getElementById('selected-file').innerText = `${path}`
})

