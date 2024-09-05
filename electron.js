const { app, BrowserWindow } = require('electron');
const path = require('path');

// Create a new browser window
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    // Load the local server (localhost:3000)
    win.loadURL('http://localhost:3000');

    // Optional: Open DevTools for debugging
    // win.webContents.openDevTools();
}

// Initialize the Electron app
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
