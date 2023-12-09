const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  login: (token, chanID) => ipcRenderer.send('discord:login', token, chanID),
  loginUpdate: (callback) => ipcRenderer.on('discord:login:result', (_event, result, chanID, name) => {
    callback(result, chanID, name);
  }),
  onMessage: (callback) => ipcRenderer.on('discord:message:created', (_event, message, pfp) =>{
    callback(message, pfp);
  }),
  sendMessage: (message) => ipcRenderer.send('discord:client:send', message)
})