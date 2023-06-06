function timSort(arr) {
    var n = arr.length;
    if (n === 0) {
      return arr;
    }
  
    // Schritte-Array für die Aufzeichnung der Sortierschritte
    var steps = [];
  
    // Minimale Größe für den Einsatz des Insertion-Sorts
    var minRun = 32;
  
    // Array in Runs aufteilen
    var runs = [];
    var i = 0;
    while (i < n) {
      var run = [arr[i]];
      if (i === n - 1) {
        runs.push(run);
        break;
      }
      var ascending = arr[i] <= arr[i + 1];
      while (i < n - 1 && (arr[i] <= arr[i + 1] === ascending)) {
        run.push(arr[i + 1]);
        i++;
      }
      if (!ascending) {
        run.reverse();
      }
      runs.push(run);
      i++;
    }
  
    // Runs sortieren und zu größeren Runs verschmelzen
    var sortedRuns = [];
    for (var j = 0; j < runs.length; j++) {
      var run = runs[j];
      insertSort(run, steps);
      sortedRuns.push(run);
      mergeRuns(sortedRuns, steps);
    }
  
    // Das finale sortierte Array erstellen
    var sortedArray = [];
    for (var k = 0; k < sortedRuns.length; k++) {
      sortedArray = sortedArray.concat(sortedRuns[k]);
    }
  
    // Schritte-Array zurückgeben
    return steps;
  }
  
  function insertSort(arr, steps) {
    var n = arr.length;
    for (var i = 1; i < n; i++) {
      var key = arr[i];
      var j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
  
      // Schritt aufzeichnen
      steps.push({
        index1: j + 1,
        index2: i,
      });
    }
  }
  
  function mergeRuns(runs, steps) {
    while (runs.length > 1) {
      var run1 = runs[runs.length - 2];
      var run2 = runs[runs.length - 1];
      runs.splice(runs.length - 2, 2);
      var merged = merge(run1, run2, steps);
      runs.push(merged);
    }
  }
  
  function merge(arr1, arr2, steps) {
    var merged = [];
    var i = 0;
    var j = 0;
    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] <= arr2[j]) {
        merged.push(arr1[i]);
        i++;
      } else {
        merged.push(arr2[j]);
        j++;
      }
  
      // Schritt aufzeichnen
      steps.push({
        index1: merged.length - 1,
        index2: i < arr1.length ? i : arr1.length + j - 1,
      });
    }
  
    while (i < arr1.length) {
      merged.push(arr1[i]);
      i++;
  
      // Schritt aufzeichnen
      steps.push({
        index1: merged.length - 1,
        index2: i < arr1.length ? i : arr1.length + j - 1,
      });
    }
  
    while (j < arr2.length) {
      merged.push(arr2[j]);
      j++;
  
      // Schritt aufzeichnen
      steps.push({
        index1: merged.length - 1,
        index2: i < arr1.length ? i : arr1.length + j - 1,
      });
    }
  
    return merged;
  }
  
  // Beispielaufruf
  var array = [29, 13, 22, 37, 52, 49, 46, 71, 56];
  var sortingSteps = timSort(array);
  
  // Ausgabe der Schritte auf der Konsole
  for (var step of sortingSteps) {
    console.log(`Index1: ${step.index1}, Index2: ${step.index2}`);
  }
  
  // Ausgabe des sortierten Arrays
  console.log("Sortiertes Array: ", array);
  