import DataFileManager from './diskControler/diskController.js';

class settings{
    constructor(){
    this.version="0.1 Alpha";
    this.user="Default";
    this.projektname="Default Projekt";
    this.autoSaveOn=true;
    }

    getAppVersion(){
        return version
    }



    autoSave(){
        if(autoSaveOn){
        saveToDisk('C:/Users/mweis/Desktop','test',activeElementIndex,activeElementIndex,DFM.version);
        }
    }


    getUser() {
        return user;
    }
    setUser(newUser) {
        user = newUser;
    }
    getProjektname() {
        return projektname;
    }
    setProjektname(newProjektname) {
        projektname = newProjektname;
    }
    
    getAutoSaveOn() {
        return autoSaveOn;
    }
    
    setAutoSaveOn(newAutoSaveOn) {
        autoSaveOn = newAutoSaveOn;
    }
}