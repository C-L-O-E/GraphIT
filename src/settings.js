import { saveToLocalFile } from "./modules/terminal.js";

var version="0.1 Alpha";
var user="Default";
var projektname="Default Projekt";
var autoSaveOn=true;

export function getAppVersion(){
    return version
}



setInterval(autoSave,10000);
function autoSave(){
    if(autoSaveOn){
        saveToLocalFile();
        console.log("Automaticly Saved")
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
