const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,        // 允许渲染进程使用 Node.js
      contextIsolation: false,     // 禁用上下文隔离
      webSecurity: false           // 禁用安全策略（慎用）
    }
  })

  // 开发环境加载本地服务
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:8080')
    win.webContents.openDevTools() // 打开开发者工具
  } else {
    // 生产环境加载构建文件
    win.loadFile(path.join(__dirname, 'dist/index.html'))
  }
}

app.whenReady().then(createWindow)
