import { saveToLocalFile } from "./modules/terminal.js";
import { addLog,addError,addWarning } from '../modules/terminal.js';

var version="0.1 Alpha";
var user="Default";
var projektname="Default Projekt";
var autoSaveOn=true;
var globalWorkspacePath=null;

export function getAppVersion(){
    return version
}



setInterval(autoSave,10000);
function autoSave(){
    if(autoSaveOn&&globalWorkspacePath!=null){
        saveToLocalFile();
        addLog("Automaticly Saved")
    }
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

  export function setGlobalWorkspace(newPath){
    globalWorkspacePath=newPath;
  }

  export function getGlobalWorkspace(){
    return globalWorkspacePath;
  }