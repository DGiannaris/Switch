const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
// Autoupdater
const {autoUpdater} = require("electron-updater");


const path = require('path');
const url = require('url');
const FB = require('fb');
const server = require('./server');



// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

autoUpdater.on('update-downloaded', (ev, info) => {
  // Wait 5 seconds, then quit and install
  // In your application, you don't need to wait 5 seconds.
  // You could call autoUpdater.quitAndInstall(); immediately
    mainWindow.webContents.executeJavaScript(`console.log(${ev, info}})`);
    mainWindow.webContents.executeJavaScript(`alert('test updates')`);
    autoUpdater.quitAndInstall();  
})

autoUpdater.on('checking-for-update', () => {
    mainWindow.webContents.executeJavaScript(`console.log('checking for updates')`);
})

autoUpdater.on('update-not-available', (info) => {
    mainWindow.webContents.executeJavaScript(`console.log('updates not available')`);
    mainWindow.webContents.executeJavaScript(`console.log('${info}')`);
})

autoUpdater.on('error', (ev, err) => {
    mainWindow.webContents.executeJavaScript(`console.log('error on updates')`);
    mainWindow.webContents.executeJavaScript(`console.log('${err}')`);
    mainWindow.webContents.executeJavaScript(`console.log('${ev}')`);
})
function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1280,
        'minWidth': 1280,
        height: 768,
        taskbar: false,
        icon: 'https://raw.githubusercontent.com/DGiannaris/Switch/master/logo.ico',
    });
    mainWindow.setMenu(null);
    mainWindow.webContents.executeJavaScript(`console.log('should run by now')`);
    //  Example of IPC Renderer, http://electron.atom.io/docs/api/ipc-main/
    //  Example of IPC Renderer, http://electron.atom.io/docs/api/ipc-main/
    const {ipcMain} = require('electron');
    ipcMain.on('fbBtn', (event, arg) => {
        //FAcebook login flow
        let fbReplyEvent = event
        var options = {
            client_id: '379329449114077',
            scopes: 'public_profile',
            redirect_uri: 'https://www.facebook.com/connect/login_success.html'
        }

        var authWindow = new BrowserWindow({
            width: 450,
            height: 400,
            show: false,
            webPreferences: {
                nodeIntegration:false,
                webSecurity: false
            }           
        });
        var facebookAuthURL = 
            `https://www.facebook.com/v2.8/dialog/oauth?client_id=${options.client_id}&redirect_uri=${options.redirect_uri}&response_type=token,granted_scopes&scope=${options.scopes}&display=popup`
        authWindow.loadURL(facebookAuthURL)
        authWindow.show()
        authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
            var raw_code = /access_token=([^&]*)/.exec(newUrl) || null;
            access_token = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
            error = /\?error=(.+)$/.exec(newUrl);
            if(access_token) {
                FB.setAccessToken(access_token);
                FB.api('/me', { fields: ['id', 'name', 'picture.width(800).height(800)'] }, function (res) {
                  mainWindow.webContents.executeJavaScript('console.log(' + res.name + ')');
                  fbReplyEvent.sender.send('fbReply', res)
                });
                authWindow.close();
            }
        });
        authWindow.webContents.on('will-navigate', function (event, url) {
            var raw_code = /access_token=([^&]*)/.exec(url) || null;
            access_token = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
            error = /\?error=(.+)$/.exec(url);
            if(access_token) {
                FB.setAccessToken(access_token);
                FB.api('/me', { fields: ['id', 'name', 'picture.width(800).height(800)'] }, function (res) {                 
                  fbReplyEvent.sender.send('fbReply', res)
                });
                authWindow.close();
            }
        });
        

    });

    ipcMain.on('fbLogout', (event, arg) => {
        FB.api('/me/permissions', 'delete', function(response) {
            event.sender.send('fbLogoutReplay', 'out')
        });
    })


    // and load the index.html of the app.
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    mainWindow.loadURL(startUrl);
    // Open the DevTools.
    //mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
    createWindow();
});

app.on('ready', function() {
    autoUpdater.checkForUpdates();
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()

    }
});


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
