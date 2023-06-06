const { app, BrowserWindow,screen } = require('electron');

const path = require('path');
var child=null;
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


 // mainWindow.webContents.openDevTools();
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
      moveWindowToSecondScreenAndFullscreen(child);
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

  // Check if there are at least two displays
  if (displays.length < 2) {
    console.error('There is only one display available.');
    return;
  }

  // Get the second display
  const secondDisplay = displays[1];

  // Get the bounds of the second display
  const { x, y, width, height } = secondDisplay.bounds;

  // Move the window to the second display
  window.setBounds({ x, y, width, height });

  // Set the window to fullscreen
  window.setFullScreen(true);
}










