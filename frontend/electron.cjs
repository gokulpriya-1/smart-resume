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

  // Handle keyboard navigation shortcuts (Reload, Back, Forward)
  win.webContents.on('before-input-event', (event, input) => {
    if (input.type === 'keyDown') {
      // Reload page: Ctrl+R or F5
      if ((input.control && input.key.toLowerCase() === 'r') || input.key === 'F5') {
        win.webContents.reload();
        event.preventDefault();
      }
      // Back page: Alt+Left
      if (input.alt && input.key === 'Left') {
        if (win.webContents.canGoBack()) {
          win.webContents.goBack();
        }
        event.preventDefault();
      }
      // Forward page: Alt+Right
      if (input.alt && input.key === 'Right') {
        if (win.webContents.canGoForward()) {
          win.webContents.goForward();
        }
        event.preventDefault();
      }
    }
  });

  // Handle trackpad swipes and mouse side back/forward buttons (Browser navigation gestures)
  win.on('app-command', (e, cmd) => {
    if (cmd === 'browser-backward') {
      if (win.webContents.canGoBack()) {
        win.webContents.goBack();
      }
    } else if (cmd === 'browser-forward') {
      if (win.webContents.canGoForward()) {
        win.webContents.goForward();
      }
    }
  });

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
