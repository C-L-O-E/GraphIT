import { saveToLocalFile,addLog,addError,addWarning } from "./modules/terminal.js";
import { loadSettings,saveSettings } from "./diskControler/diskController.js";

var version="0.1 Alpha";
var user="Default";
var projektname="Default Projekt";
var autoSaveOn=true;
var globalWorkspacePath=process.env.workspacePath;
var updateNumber=0;
var settings=null;
const variables = ['version', 'user', 'projektname','autoSaveOn','globalWorkspacePath','updateNumber'];
export const { updateSettings, setSettings } = generateSettingsFunctions(variables);

export function initSettings(){
  settings=loadSettings();
  setSettings(settings);
}

export function getAppVersion(){
    return version
}

export function generateSettingsObject() {
  const settings = {
    version: "0.1 Alpha",
    user: "Default",
    projectName: "Default Projekt",
    autoSaveOn: true,
    globalWorkspacePath: process.env.workspacePath,
    updateNumber: 0
  };

  return settings;
}


setInterval(autoSave,10000);
function autoSave(){
    if(autoSaveOn&&globalWorkspacePath!=null){
        saveToLocalFile();
        addLog("Automaticly Saved To Wrokspace")
    }
}


export function generateSettingsFunctions(variables) {
  const updateSettings = (settings) => {
    Object.keys(settings).forEach((key) => {
      if (variables.includes(key)) {
        eval(`${key} = settings[key]`);
      }
    });
  };

  const setSettings = (settings) => {
    variables.forEach((variable) => {
      if (settings.hasOwnProperty(variable)) {
        eval(`${variable} = settings[variable]`);
      }
    });
  };

  return {
    updateSettings,
    setSettings
  };
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