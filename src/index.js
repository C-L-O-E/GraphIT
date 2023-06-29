const {
  app,
  BrowserWindow,
  screen,
  dialog,
  Menu
} = require('electron');

const {autoUpdater} = require('electron-updater');
const { exec } = require('child_process');
const path = require('path');
const userDataPath = app.getPath('userData');
const settingsFilePath = path.join(userDataPath, 'GraphIt-settings.json');
const workspacePath = path.join(userDataPath, 'GraphIT');
const iconPath = path.join(app.getAppPath(), 'src', 'img', 'logo.ico');
process.env.settingsFilePath = settingsFilePath;
process.env.userDataPath = userDataPath;
process.env.workspacePath = workspacePath;
process.env.autoDownload = "false";
var autoupdate=false;
if(process.env.autoDownload=="false"){
  autoupdate=false;
}else{
  autoupdate=true;
}
autoUpdater.autoDownload = autoupdate;

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
  mainWindow.setIcon(iconPath);
  mainWindow.loadFile(path.join(__dirname, 'index.html'));


  //mainWindow.webContents.openDevTools();

  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open File',
          click: () => {
            process.env.userDataPath = openFileExplorer();
          },
        },
        {
          label: 'Settings',
          click: () => {
            createSettingsWindow();
          },
        },
        {
          label: 'Save',
          click: () => {
            // writeFile
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
    {
      label: 'View',
      submenu: [
        {
          label: 'Zoom In',
          click: () => {
            zoomIn();
          },
        },
        {
          label: 'Zoom Out',
          click: () => {
            zoomOut();
          },
        },
        {
          type: 'separator',
        },
        {
          label: 'Preview',
          click: () => {
            preview('create');
          },
        },
        {
          label: 'Preview to second Screen',
          click: () => {
            showVisualSecondScreen('PreviewSecondScreen');
          },
        },
        {
          label: 'Preview to third Screen',
          click: () => {
            showVisualSecondScreen('PreviewThirdScreen');
          },
        },
        {
          type: 'separator',
        },
        {
          label: 'Task',
          click: () => {
            // todo
          },
        },
      ],
    },
    {
      label: 'Datastructures',
      submenu: [
        {
          label: 'Array',
          click: () => {
            // todo
          },
        },
        {
          label: 'BinarySearchTree',
          click: () => {
            // todo
          },
        },
        {
          label: 'Stack',
          click: () => {
            // todo
          },
        },
        {
          label: 'Single Linked List',
          click: () => {
            // todo
          },
        },
        {
          label: 'Multi Linked List',
          click: () => {
            // todo
          },
        },
        {
          label: 'Graph',
          click: () => {
            // todo
          },
        },
      ],
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Info Page',
          click: () => {
            const documentationURL = 'https://github.com/C-L-O-E/GraphIT/wiki/Dokumentation';
            openWebsite(documentationURL);
          },
        },
        {
          label: 'Projects Page',
          click: () => {
            const documentationURL = 'https://c-l-o-e.github.io/projects.html';
            openWebsite(documentationURL);
          },
        },
        {
          label: 'Documentation',
          click: () => {
            const documentationURL = 'https://github.com/C-L-O-E/GraphIT/wiki/Dokumentation';
            openWebsite(documentationURL);
          },
        },
        {
          label: 'Get Help',
          click: () => {
            const documentationURL = 'https://github.com/C-L-O-E/GraphIT';
            openWebsite(documentationURL);
          },
        },
        {
          label: 'Issues',
          click: () => {
            const documentationURL = 'https://github.com/C-L-O-E/GraphIT/issues';
            openWebsite(documentationURL);
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
    createUpdateWindow();
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
      enableRemoteModule: true

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
  } else if (data == 'showVisual'&&child==null) {
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
    //child.webContents.openDevTools();
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


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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

async function delaitCreateWindow(sleepTime){
  await sleep(sleepTime);
  createWindow();
  updateWindow.close();
} 

app.on('ready', () => {
  createUpdateWindow();
  updateWindow.webContents.send('setString', 'Checking for updates...');
  if(process.env.autoDownload=="false"){
    delaitCreateWindow(1000);
    autoUpdater.checkForUpdates().catch(err => {
      updateWindow.webContents.send('setString', "Error checking for updates:", err);
    });
  }
});



const createUpdateWindow = () => {
  updateWindow = new BrowserWindow({
    width: 400,
    height: 220,
    frame: false,
    resizable: false,

    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,

    },
  });
  updateWindow.webContents.on('did-finish-load', () => {
    updateWindow.webContents.send('setString', "Loading...");
  });

  updateWindow.on('closed', () => {
    updateWindow = null;
  });
  updateWindow.loadFile('./src/update.html');
  updateWindow.setIcon(iconPath);
}

autoUpdater.setFeedURL({
  provider: 'github',
  owner: 'C-L-O-E',
  repo: 'GraphIT',
  releaseType: 'release'
});


autoUpdater.on('update-downloaded', () => {
  updateWindow.webContents.send('setString', 'Update-App...');
  mainWindow.webContents.send('app:updateReady');
  updateWindow.close();
  delaitCreateWindow(1000);
});


ipcMain.on('app:update', () => {
  updateWindow.webContents.send('setString', 'Start updating');
  autoUpdater.downloadUpdate().catch(err => {
    updateWindow.webContents.send('setString', "Error downloading update:"+ err);
    updateWindow.close();
    delaitCreateWindow(1000);
  });
  updateWindow.close();
  delaitCreateWindow(1000);
});


autoUpdater.on('error', (err) => {
  updateWindow.webContents.send('setString', "Error downloading update:"+ err);
  updateWindow.close();
  delaitCreateWindow(1000);
});


autoUpdater.on('download-progress', (progress) => {
  updateWindow.webContents.send('setString', "Download progress:"+progress);
});




const createSettingsWindow = () => {
  updateWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    resizable: false,

    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,

    },
  });
  updateWindow.webContents.on('did-finish-load', () => {
    updateWindow.webContents.send('setString', "Loading...");
  });

  updateWindow.on('closed', () => {
    updateWindow = null;
  });
  updateWindow.loadFile('./src/settings/settings.html');
  updateWindow.setIcon(iconPath);
}

function openWebsite(url) {
  let command;

  switch (process.platform) {
    case 'darwin':
      command = `open ${url}`;
      break;
    case 'win32':
      command = `start ${url}`;
      break;
    case 'linux':
      command = `xdg-open ${url}`;
      break;
    default:
      mainWindow.webContents.send('error-channel','Unsupported platform');
      return;
  }



  exec(command, (error) => {
    if (error) {
      mainWindow.webContents.send('error-channel',`Unable to open browser: ${error}`);
    }
  });
}

ipcMain.on('scroll', (event, direction) => {
  if(child!=null){
  child.webContents.send('scroll',direction);
  console.log(`Scrolling ${direction}`);
  }
});


ipcMain.on('closeAllWindows',(event,data)=>{
    try {
      mainWindow.close();
      mainWindow=null;
    } catch (error) { 
      console.log("Error Main Window"+ Error)
    }
    try {
      child.close();
      child=null;
    } catch (error) { 
      console.log("Error child window"+ Error)
    }
    try {
      updateWindow.close();
      updateWindow=null;
    } catch (error) { 
      console.log("Error child window"+ Error)
    }
    
})



