const { app, BrowserWindow, screen, dialog, Menu } = require('electron');
const path = require('path');
const userDataPath = app.getPath('userData');
const settingsFilePath = path.join(userDataPath, 'GraphIt-settings.json');
const workspacePath = path.join(userDataPath, 'GraphIT');
process.env.settingsFilePath = settingsFilePath;
process.env.userDataPath = userDataPath;
process.env.workspacePath = workspacePath;

var child = null;
var info=null;
var mainWindow;
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
   mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
   
      //fullscreen:true

     webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
            contextIsolation: false,

    },
  });
mainWindow.maximize();
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));


  mainWindow.webContents.openDevTools();


 const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open File',
        click: () => {
          process.env.userDataPath=openFileExplorer();
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


app.on('ready', createWindow);


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




//ipc Part
var viewContend=null;

const {ipcMain} =require('electron');
const { writeFile } = require('fs');
ipcMain.on('getUpdate',(event,data)=>{
 // console.log("Data From Preview Client: "+data);
  event.sender.send("update",viewContend);

});
var zoomVar="not"
ipcMain.on('getZoomUpdate',(event,data)=>{
  event.sender.send('zoomUpdate',zoomVar)
  if(zoomVar!='not'){
    zoomVar='not';
  }
});

ipcMain.on('updateZoomPrev',(event,data)=>{
  zoomVar=data;
});

ipcMain.on('mainUpdate',(event,data)=>{
 // console.log("Main Window Updatede Contend");
  viewContend=data;
});

ipcMain.on('exit',(event,data)=>{
  if(data=="exit"){
    exitSys();
  }
})

ipcMain.on('info',(event,data)=>{
  console.log("Data From Client: "+data);
  info=new BrowserWindow({
    width: 800,
    height: 600,
    
      //fullscreen:true
     webPreferences: {
      
      nodeIntegration: true,
            contextIsolation: false,

    },
  });
  info.loadFile(path.join(__dirname, 'info.html'));
})


ipcMain.on('comand',(event,data)=>{
  if(data=='showVisualSecondScreen'){
    if(child!=null){
      var retStrArr=moveWindowToSecondScreenAndFullscreen(child);
      if(retStrArr[0]=='log'){
        event.sender.send("logChannel",retStrArr[1]);
      }else if(retStrArr[0]=='error'){
        event.sender.send("errorChannel",retStrArr[1]);
      }
    }
  }else if(data=='showVisualThirdScreen'){
    if(child!=null){
      var retStrArr=moveWindowToTirdScreenAndFullscreen(child);
      if(retStrArr[0]=='log'){
        event.sender.send("logChannel",retStrArr[1]);
      }else if(retStrArr[0]=='error'){
        event.sender.send("errorChannel",retStrArr[1]);
      }
    }
  }else if(data=='showVisual'){
  console.log("Data From Client: "+data);
  child=new BrowserWindow({
    width: 400,
    height: 400,
    x:0,
    y:0,
    
      //fullscreen:true
     webPreferences: {
      
      nodeIntegration: true,
            contextIsolation: false,

    },
  });
  child.loadFile(path.join(__dirname, 'preview.html'));
  }else if(data=="endPresentation"){
    child.close();
    child=null;
  }
});

function exitSys(){
  try {
    app.quit(); 
  } catch (error) {  
    
  }
}


function moveWindowToSecondScreenAndFullscreen(window) {
  // Get all available displays
  const displays = screen.getAllDisplays();
  var retStr="";
  var retStrArr=[];
  // Check if there are at least two displays
  if (displays.length < 2) {
    retStr='There is only one display available.';
    retStrArr.push("error");
    retStrArr.push(retStr);
    return retStrArr;
  }

  // Get the second display
  const secondDisplay = displays[1];

  // Get the bounds of the second display
  const { x, y, width, height } = secondDisplay.bounds;

  // Move the window to the second display
  window.setBounds({ x, y, width, height });

  // Set the window to fullscreen
  window.setFullScreen(true);
  retStr="Presentation Window sucsesfully moved to Second Screen."
  retStrArr.push("log");
  retStrArr.push(retStr);
  return retStrArr;
}

function moveWindowToTirdScreenAndFullscreen(window) {
  // Get all available displays
  const displays = screen.getAllDisplays();
  var retStrArr=[];
  var retStr="";
  // Check if there are at least two displays
  if (displays.length < 3) {
    retStr='There is no Third display available.';
    retStrArr.push("error");
    retStrArr.push(retStr);
    return retStrArr;
  }

  // Get the second display
  const thirdDisplay = displays[2];

  // Get the bounds of the second display
  const { x, y, width, height } = thirdDisplay.bounds;

  // Move the window to the second display
  window.setBounds({ x, y, width, height });

  // Set the window to fullscreen
  window.setFullScreen(true);
  retStr="Presentation Window sucsesfully moved to Third Screen."
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






