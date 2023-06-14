import {
  saveToLocalFile,
  addLog,
  addError,
  addWarning
} from "./modules/terminal.js";
import {
  loadSettings,
  saveSettings
} from "./diskControler/diskController.js";


var version = "0.1 Alpha";
var user = "Default";
var projectName = "Default Projekt";
var autoSaveOn = true;
var globalWorkspacePath = process.env.workspacePath;
var globalSettingsPath = process.env.globalSettingsPath;
var colorMode = "dark";
var updateNumber = 0;
var textColor = "iceblue";

export function getVersion() {
  return version;
}

export function getUser() {
  return user;
}

export function getProjectName() {
  return projectName;
}

export function getAutoSaveOn() {
  return autoSaveOn;
}

export function getGlobalWorkspacePath() {
  return globalWorkspacePath;
}

export function getGlobalSettingsPath() {
  return globalSettingsPath;
}

export function getColorMode() {
  return colorMode;
}

export function getUpdateNumber() {
  return updateNumber;
}

export function getTextColor() {
  return textColor;
}

export function getAppVersion() {
  return version;
}

// Setter-Funktionen
export function setVersion(newVersion) {
  version = newVersion;
}

export function setUser(newUser) {
  user = newUser;
}

export function setProjectName(newProjectName) {
  projectName = newProjectName;
}

export function setAutoSaveOn(newAutoSaveOn) {
  autoSaveOn = newAutoSaveOn;
}

export function setGlobalWorkspacePath(newGlobalWorkspacePath) {
  globalWorkspacePath = newGlobalWorkspacePath;
}

export function setGlobalSettingsPath(newGlobalSettingsPath) {
  globalSettingsPath = newGlobalSettingsPath;
}

export function setColorMode(newColorMode) {
  colorMode = newColorMode;
}

export function setUpdateNumber(newUpdateNumber) {
  updateNumber = newUpdateNumber;
}

export function setTextColor(newTextColor) {
  textColor = newTextColor;
}

export function initSettings() {
  updateSettings(loadSettings());
}

// Funktion zum Aktualisieren der Einstellungen
export function updateSettings(settings) {
  setVersion(settings.version);
  setUser(settings.user);
  setProjectName(settings.projectName);
  setAutoSaveOn(settings.autoSaveOn);
  setGlobalWorkspacePath(settings.globalWorkspacePath);
  setGlobalSettingsPath(settings.globalSettingsPath);
  setColorMode(settings.colorMode);
  setUpdateNumber(settings.updateNumber);
  setTextColor(settings.textColor);
}

// Funktion zum Erstellen eines Settings-Objekts
export function createSettingsObject() {
  var settings = {
    version: getVersion(),
    user: getUser(),
    projectName: getProjectName(),
    autoSaveOn: getAutoSaveOn(),
    globalWorkspacePath: getGlobalWorkspacePath(),
    globalSettingsPath: getGlobalSettingsPath(),
    colorMode: getColorMode(),
    updateNumber: getUpdateNumber(),
    textColor: getTextColor()
  };
  
  return settings;
}

setInterval(autoSave, 60000);

export function autoSave() {
  if (autoSaveOn && globalWorkspacePath != null) {
    saveToLocalFile();
    saveSettings();
    addLog("Automaticly Saved To Wrokspace")
  }
}

