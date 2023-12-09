const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { Client, GatewayIntentBits } = require('discord.js');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const bot = new Client({intents:[
  GatewayIntentBits.Guilds,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMessages
]});

let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });


  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }
  
  //disalbe menu
  mainWindow.setMenu(null);
  
  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

};

// datas
let chanID = "";

function login(_event, token, channelId){
  chanID = channelId;
  bot.login(token).then(() => {
    mainWindow.webContents.send('discord:login:result', 0,
     bot.channels.cache.get(chanID), bot.user.username);
  }).catch(error => {
    mainWindow.webContents.send('discord:login:result', -1);
  });
}

//macOS command + Q
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(() => {

  ipcMain.on('discord:login', login);
  ipcMain.on('discord:client:send', (message) => {
    bot.channels,caches.get(chanID).send(message);
  });

  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

//bot logic
bot.on('messageCreate', (msg) => {
  if (msg.channelId != chanID) { return; } 
  mainWindow.webContents.send('discord:message:created', msg, msg.author.displayAvatarURL({size: 128, dynamic: true}));
});