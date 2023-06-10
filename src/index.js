const {app,BrowserWindow,screen,dialog,Menu} = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');
const userDataPath = app.getPath('userData');
const settingsFilePath = path.join(userDataPath, 'GraphIt-settings.json');
const workspacePath = path.join(userDataPath, 'GraphIT');
process.env.settingsFilePath = settingsFilePath;
process.env.userDataPath = userDataPath;
process.env.workspacePath = workspacePath;

var child = null;
var info = null;
var mainWindow;

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,



    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,

    },
  });
  mainWindow.maximize();

  mainWindow.loadFile(path.join(__dirname, 'index.html'));


  mainWindow.webContents.openDevTools();


  const template = [{
      label: 'File',
      submenu: [{
          label: 'Open File',
          click: () => {
            process.env.userDataPath = openFileExplorer();
          },
        },
        {
          label: 'Save',
          click: () => {
            writeFile
          },
        },
        {
          type: 'separator',
        },
        {
          label: 'Exit',
          click: () => {
            app.quit();
          },
        },
      ],
    },

  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

};





app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});





var viewContend = null;

const {
  ipcMain
} = require('electron');
const {
  writeFile
} = require('fs');
ipcMain.on('getUpdate', (event, data) => {

  event.sender.send("update", viewContend);

});
var zoomVar = "not"
ipcMain.on('getZoomUpdate', (event, data) => {
  event.sender.send('zoomUpdate', zoomVar)
  if (zoomVar != 'not') {
    zoomVar = 'not';
  }
});

ipcMain.on('updateZoomPrev', (event, data) => {
  zoomVar = data;
});

ipcMain.on('mainUpdate', (event, data) => {

  viewContend = data;
});

ipcMain.on('exit', (event, data) => {
  if (data == "exit") {
    exitSys();
  }
})

ipcMain.on('info', (event, data) => {
  console.log("Data From Client: " + data);
  info = new BrowserWindow({
    width: 800,
    height: 600,


    webPreferences: {

      nodeIntegration: true,
      contextIsolation: false,

    },
  });
  info.loadFile(path.join(__dirname, 'info.html'));
})


ipcMain.on('comand', (event, data) => {
  if (data == 'showVisualSecondScreen') {
    if (child != null) {
      var retStrArr = moveWindowToSecondScreenAndFullscreen(child);
      if (retStrArr[0] == 'log') {
        event.sender.send("logChannel", retStrArr[1]);
      } else if (retStrArr[0] == 'error') {
        event.sender.send("errorChannel", retStrArr[1]);
      }
    }
  } else if (data == 'showVisualThirdScreen') {
    if (child != null) {
      var retStrArr = moveWindowToTirdScreenAndFullscreen(child);
      if (retStrArr[0] == 'log') {
        event.sender.send("logChannel", retStrArr[1]);
      } else if (retStrArr[0] == 'error') {
        event.sender.send("errorChannel", retStrArr[1]);
      }
    }
  } else if (data == 'showVisual') {
    console.log("Data From Client: " + data);
    child = new BrowserWindow({
      width: 400,
      height: 400,
      x: 0,
      y: 0,


      webPreferences: {

        nodeIntegration: true,
        contextIsolation: false,

      },
    });
    child.loadFile(path.join(__dirname, 'preview.html'));
  } else if (data == "endPresentation") {
    child.close();
    child = null;
  }
});

function exitSys() {
  try {
    app.quit();
  } catch (error) {

  }
}


function moveWindowToSecondScreenAndFullscreen(window) {

  const displays = screen.getAllDisplays();
  var retStr = "";
  var retStrArr = [];

  if (displays.length < 2) {
    retStr = 'There is only one display available.';
    retStrArr.push("error");
    retStrArr.push(retStr);
    return retStrArr;
  }


  const secondDisplay = displays[1];


  const {
    x,
    y,
    width,
    height
  } = secondDisplay.bounds;


  window.setBounds({
    x,
    y,
    width,
    height
  });


  window.setFullScreen(true);
  retStr = "Presentation Window sucsesfully moved to Second Screen."
  retStrArr.push("log");
  retStrArr.push(retStr);
  return retStrArr;
}

function moveWindowToTirdScreenAndFullscreen(window) {

  const displays = screen.getAllDisplays();
  var retStrArr = [];
  var retStr = "";

  if (displays.length < 3) {
    retStr = 'There is no Third display available.';
    retStrArr.push("error");
    retStrArr.push(retStr);
    return retStrArr;
  }


  const thirdDisplay = displays[2];


  const {
    x,
    y,
    width,
    height
  } = thirdDisplay.bounds;


  window.setBounds({
    x,
    y,
    width,
    height
  });


  window.setFullScreen(true);
  retStr = "Presentation Window sucsesfully moved to Third Screen."
  retStrArr.push("log");
  retStrArr.push(retStr);
  return retStrArr;
}


function openFileExplorer() {
  dialog.showOpenDialog({
    properties: ['openFile']
  }).then((result) => {
    if (!result.canceled) {
      const filePath = result.filePaths[0];
      mainWindow.webContents.send('file-selected', filePath);
    }
  });
}

ipcMain.on('open-file-explorer', () => {
  openFileExplorer();
});

// Konfiguration der automatischen Updates
autoUpdater.autoDownload = false; // Deaktiviert das automatische Herunterladen der Updates

// Überprüfung auf Updates beim Start der App
app.on('ready', () => {
  createWindow();
  console.log("Checking for updates");
  autoUpdater.checkForUpdates();
});

// GitHub-Repository-URL angeben
autoUpdater.setFeedURL({
  owner: 'C-L-O-E',
  repo: 'GraphIT',
  branch: 'release' // Optional: Branch angeben, falls abweichend von 'master'
});

// Eventlistener für den Abschluss des Downloads
autoUpdater.on('update-downloaded', () => {
  // Hier kannst du eine Benachrichtigung oder eine Meldung an den Benutzer anzeigen

  // Event an den Renderer-Prozess senden, um das Update durchzuführen
  mainWindow.webContents.send('app:updateReady');
});

// Eventlistener für das Aktualisieren der App
ipcMain.on('app:update', () => {
  console.log("Downloading update");
  autoUpdater.downloadUpdate(); // Herunterladen des Updates
});

// Eventlistener für Fehler während des Update-Prozesses
autoUpdater.on('error', (err) => {
  // Hier kannst du Fehlerbehandlung durchführen, z.B. eine Fehlermeldung anzeigen
});

// Eventlistener für Fortschritt des Downloads
autoUpdater.on('download-progress', (progress) => {
  // Hier kannst du den Fortschritt des Downloads anzeigen, z.B. in einer Fortschrittsleiste
});
