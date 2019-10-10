const {shell} = require('electron')
const os = require('os')

const fileManagerBtn = document.getElementById('open-file-manager')

fileManagerBtn.addEventListener('click', () => {
    shell.showItemInFolder(os.homedir())
})
