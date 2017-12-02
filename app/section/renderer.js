// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const path = require('path')
const BrowserWindow = require('electron').remote.BrowserWindow

const btnApi = document.getElementById('btn-api')
btnApi.addEventListener('click', function () {
    openApiWindow()
})

function openApiWindow() {
    openWindow('./api.html')
}

function openWindow(url, width, height) {
    const modalPath = path.join('file://', __dirname, url)
    if (!isNaN(Number(width))) {
        width = 600
    }
    if (!isNaN(Number(height))) {
        height = 400
    }
    let win = new BrowserWindow({width: width, height: height})
    win.on('close', function () {
        win = null
    })
    win.loadURL(modalPath)
    win.show()
}