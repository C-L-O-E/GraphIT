import {
    getAppVersion,
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
  var appVersionInput = document.getElementById('app-version');
  var userInput = document.getElementById('user');
  var projectNameInput = document.getElementById('project-name');
  var autoSaveInput = document.getElementById('auto-save');
  var workspacePathInput = document.getElementById('workspace-path');
  var colorModeInput = document.getElementById('color-mode');
  var textColorInput = document.getElementById('text-color');
  
  var appVersion = appVersionInput.value;
  var user = userInput.value;
  var projectName = projectNameInput.value;
  var autoSaveOn = autoSaveInput.checked;
  var globalWorkspacePath = workspacePathInput.value;
  var colorMode = colorModeInput.checked ? 'dark' : 'light';
  var textColor = textColorInput.value;
  
  // Event Listener für Änderungen
  appVersionInput.addEventListener('input', function() {
    appVersion = appVersionInput.value;
  });
  
  userInput.addEventListener('input', function() {
    user = userInput.value;
  });
  
  projectNameInput.addEventListener('input', function() {
    projectName = projectNameInput.value;
  });
  
  autoSaveInput.addEventListener('change', function() {
    autoSaveOn = autoSaveInput.checked;
  });
  
  workspacePathInput.addEventListener('input', function() {
    globalWorkspacePath = workspacePathInput.value;
  });
  
  colorModeInput.addEventListener('change', function() {
    colorMode = colorModeInput.checked ? 'dark' : 'light';
  });
  
  textColorInput.addEventListener('input', function() {
    textColor = textColorInput.value;
  });
  
  // Funktion zum Aktualisieren der Einstellungen
  function updateSettings() {
    // Aktualisiere die Einstellungen mit den aktuellen Variablenwerten
    console.log('App Version:', appVersion);
    console.log('User:', user);
    console.log('Project Name:', projectName);
    console.log('Auto Save:', autoSaveOn);
    console.log('Global Workspace Path:', globalWorkspacePath);
    console.log('Color Mode:', colorMode);
    console.log('Text Color:', textColor);
  }
  
  // Beispielaufruf der updateSettings-Funktion
  setInterval(updateSettings,100);
  updateSettings();
  


  function populateFields() {
    appVersionInput.value = getAppVersion();
    userInput.value = getUser();
    projectNameInput.value = getProjectName();
    autoSaveInput.checked = getAutoSaveOn();
    workspacePathInput.value = getGlobalWorkspacePath();
    colorModeInput.checked = getColorMode() === 'dark';
    textColorInput.value = getTextColor();
  }
  
  // Aufruf der Funktion zum Populieren der Felder
  populateFields();





const switchCheckbox = document.getElementById('switch-checkbox');
switchCheckbox.addEventListener('change', function() {
  if (this.checked) {
    console.log('Eingeschaltet');
  } else {
    console.log('Ausgeschaltet');
  }
});

const slider = document.getElementById('slider');
const sliderValue = document.getElementById('slider-value');

slider.addEventListener('input', function() {
  const value = slider.value;
  sliderValue.textContent = value;
});
