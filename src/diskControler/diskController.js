import {
  getVersion,
  createSettingsObject,
  getUser,
  getProjectName,
  getAutoSaveOn,
  getGlobalWorkspacePath,
  getGlobalSettingsPath,
  getColorMode,
  getUpdateNumber,
  getTextColor
} from '../settings.js';
import {
  addLog,
  addError,
  addWarning
} from '../modules/terminal.js';
const fs = require('fs');
var settingsFilePath = process.env.settingsFilePath;

export function saveToDisk(path, filename, ...data) {
  const timestamp = new Date().toISOString();
  const jsonData = {
    version: getVersion(),
    timestamp: timestamp,
    data: data
  };

  const filePath = `${path}/${filename}.json`;
  const jsonString = JSON.stringify(jsonData, null, 2);

  fs.writeFile(filePath, jsonString, 'utf8', (err) => {
    if (err) {
      addError('Fehler beim Speichern der Datei:' + err);
    } else {
      addLog(`Daten erfolgreich in "${filePath}" gespeichert.`);
    }
  });
}

export function loadFromDisk(filePath) {
  readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      addError('Fehler beim Laden der Datei:', err);
      return;
    }

    try {
      const jsonData = JSON.parse(data);

      if (jsonData.version !== this.version) {
        addWarning('Die geladene Datei hat eine andere Version.');
      }


      const loadedData = jsonData.data;


      addLog('Daten erfolgreich geladen und aktualisiert.');
    } catch (error) {
      addError('Fehler beim Parsen der JSON-Datei: ' + error);
    }
  });
}



export function createDirectoryIfNotExists(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    try {
      fs.mkdirSync(directoryPath);
      addLog(`Directory "${directoryPath}" created successfully.`);
      return true;
    } catch (error) {
      addError(`Directory "${directoryPath}" was not created.`);
      return false;
    }
  } else {
    addLog(`Directory "${directoryPath}" already exists.`);
    return true;
  }
}


export function createFileIfNotExists(filePath, content) {
  if (!fs.existsSync(filePath)) {
    try {
      fs.writeFileSync(filePath, content);
      addLog(`File "${filePath}" created successfully.`);
      return true;
    } catch (error) {
      addError(`File "${filePath}" was not created. Reason:${error}`);
      return false;
    }
  } else {
    addLog(`File "${filePath}" already exists.`);
    return true;
  }
}


export function loadSettings() {
  try {
    const data = fs.readFileSync(settingsFilePath, 'utf-8');
    addLog("Succsesfully load settings.");
    return JSON.parse(data);
  } catch (error) {
    addError('Fehler beim Laden der Einstellungen: Reason: ' + error);
    addLog('Try to Create a Settings File to Fix it automaticly...');
    createFileIfNotExists(settingsFilePath, JSON.stringify(createSettingsObject()));
    return {};
  }
}


export function saveSettings(settings) {
  try {
   

    fs.writeFileSync(settingsFilePath, JSON.stringify(createSettingsObject(), null, 2), 'utf-8');
    addLog('Einstellungen erfolgreich gespeichert.');
  } catch (error) {
    addError('Fehler beim Speichern der Einstellungen:', error);
  }
}

export function selectFile() {
  ipcRenderer.send('open-file-explorer');
}

ipcRenderer.on('file-selected', (_, filePath) => {
  console.log('Ausgewählter Dateipfad:', filePath);
});