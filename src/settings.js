import DataFileManager from './diskControler/diskController.js';

var version="0.1 Alpha";
var user="Default";
var projektname="Default Projekt";
var autoSaveOn=true;

var DFM=new DataFileManager();

export function getAppVersion(){
    return version
}



setInterval(autoSave,10000);
function autoSave(){
  DFM.saveToDisk('C:/Users/mweis/Desktop','test',activeElementIndex,activeElementIndex,DFM.version);
}



export function getUser() {
    return user;
  }
  
  export function setUser(newUser) {
    user = newUser;
  }
  
  export function getProjektname() {
    return projektname;
  }
  
  export function setProjektname(newProjektname) {
    projektname = newProjektname;
  }
  
  export function getAutoSaveOn() {
    return autoSaveOn;
  }
  
  export function setAutoSaveOn(newAutoSaveOn) {
    autoSaveOn = newAutoSaveOn;
  }