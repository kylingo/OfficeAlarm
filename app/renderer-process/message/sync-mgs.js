const {ipcRenderer} = require('electron')

const asyncBtn = document.getElementById('sync-msg-btn');

asyncBtn.addEventListener('click', () => {
    const reply = ipcRenderer.sendSync('synchronous-message', '渲染进程发送同步消息')
    const message = `同步消息回复：${reply}`
    alert(message)
})

