const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // 加载 Vue 构建后的入口文件
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:8080');  // 开发模式
  } else {
    win.loadFile(path.join(__dirname, 'dist/index.html'));  // 生产模式
  }
}

app.whenReady().then(createWindow);
