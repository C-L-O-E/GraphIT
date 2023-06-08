import { getAppVersion } from '../settings.js';
import { addLog,addError,addWarning } from '../modules/terminal.js';
const fs = require('fs');
const { app } = require('electron');
const path = require('path');
const fs = require('fs');

const userDataPath = app.getPath('userData');
const settingsFilePath = path.join(userDataPath, 'GraphIt-settings.json');


export function saveToDisk(path, filename, ...data) {
    const timestamp = new Date().toISOString();
    const jsonData = {
      version: getAppVersion(),
      timestamp: timestamp,
      data: data
    };

    const filePath = `${path}/${filename}.json`;
    const jsonString = JSON.stringify(jsonData, null, 2);

    fs.writeFile(filePath, jsonString, 'utf8', (err) => {
      if (err) {
        addError('Fehler beim Speichern der Datei:'+err);
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

        // Variablen und Arrays aktualisieren
        const loadedData = jsonData.data;
        // ...

        addLog('Daten erfolgreich geladen und aktualisiert.');
      } catch (error) {
        addError('Fehler beim Parsen der JSON-Datei:', error);
      }
    });
  }


  // Check if the directory exists
  export function createDirectoryIfNotExists(directoryPath) {
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
      console.log(`Directory "${directoryPath}" created successfully.`);
    } else {
      console.log(`Directory "${directoryPath}" already exists.`);
    }
  }
  
// Lade Einstellungen
export function loadSettings() {
  try {
    const data = fs.readFileSync(settingsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.log('Fehler beim Laden der Einstellungen:', error);
    return {};
  }
}

// Speichere Einstellungen
export function saveSettings(settings) {
  try {
    fs.writeFileSync(settingsFilePath, JSON.stringify(settings, null, 2), 'utf-8');
    console.log('Einstellungen erfolgreich gespeichert.');
  } catch (error) {
    console.log('Fehler beim Speichern der Einstellungen:', error);
  }
}

