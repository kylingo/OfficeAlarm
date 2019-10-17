const {ipcRenderer} = require('electron')

const asyncBtn = document.getElementById('async-msg-btn');

asyncBtn.addEventListener('click', () => {
    ipcRenderer.send('asynchronous-message', '渲染进程发送异步消息')
})

ipcRenderer.on('asynchronous-reply', (event, arg) => {
    alert(`异步消息回复：${arg}`)
})

