const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const waitOn = require('wait-on');

async function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    icon: path.join(__dirname, 'src', 'assets', 'logo.ico'), // 로고 아이콘 설정
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  Menu.setApplicationMenu(null); // 메뉴 제거

  if (process.env.NODE_ENV === 'development') {
    await waitOn({ resources: ['http://localhost:5173'] }); 
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html')); 
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
