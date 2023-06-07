const fs = require('fs');
import {getAppVersion} from '../settings.js';

export default class DataFileManager {
  constructor() {
    this.version = getAppVersion();
  }

  saveToDisk(path, filename, ...data) {
    const timestamp = new Date().toISOString();
    const jsonData = {
      version: this.version,
      timestamp: timestamp,
      data: data
    };

    const filePath = `${path}/${filename}.json`;
    const jsonString = JSON.stringify(jsonData, null, 2);

    fs.writeFile(filePath, jsonString, 'utf8', (err) => {
      if (err) {
        console.error('Fehler beim Speichern der Datei:', err);
      } else {
        console.log(`Daten erfolgreich in "${filePath}" gespeichert.`);
      }
    });
  }

  loadFromDisk(filePath) {
    readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Fehler beim Laden der Datei:', err);
        return;
      }

      try {
        const jsonData = JSON.parse(data);

        if (jsonData.version !== this.version) {
          console.warn('Die geladene Datei hat eine andere Version.');
        }

        // Variablen und Arrays aktualisieren
        const loadedData = jsonData.data;
        // ...

        console.log('Daten erfolgreich geladen und aktualisiert.');
      } catch (error) {
        console.error('Fehler beim Parsen der JSON-Datei:', error);
      }
    });
  }

  autoSaver(){
      
  }
}
/*
// Beispielverwendung
const manager = new DataFileManager();
manager.saveToDisk('./data', 'example', [1, 2, 3], { name: 'John Doe' });
manager.loadFromDisk('./data/example.json');
*/