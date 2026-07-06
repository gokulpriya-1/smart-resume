const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1250,
    height: 850,
    minWidth: 1000,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    backgroundColor: '#020617', // Slate-950 background color
    title: 'Smart Resume & Interview Analyzer',
  });

  // Determine environment (supports cross-platform command line flags)
  const isDev = process.env.NODE_ENV === 'development' || process.argv.includes('--dev');

  if (isDev) {
    win.loadURL('http://localhost:5173');
  } else {
    win.loadURL('https://smart-resume-self.vercel.app');
  }

  // Remove default menu bar
  win.setMenu(null);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
