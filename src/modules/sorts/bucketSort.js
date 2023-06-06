function bucketSort(arr) {
    var n = arr.length;
    if (n === 0) {
      return arr;
    }
  
    // Schritte-Array für die Aufzeichnung der Sortierschritte
    var steps = [];
  
    // Ermittlung des maximalen und minimalen Werts im Array
    var min = arr[0];
    var max = arr[0];
    for (var i = 1; i < n; i++) {
      if (arr[i] < min) {
        min = arr[i];
      } else if (arr[i] > max) {
        max = arr[i];
      }
    }
  
    // Anzahl der Eimer berechnen
    var bucketSize = 5;
    var bucketCount = Math.floor((max - min) / bucketSize) + 1;
  
    // Eimer initialisieren
    var buckets = new Array(bucketCount);
    for (var j = 0; j < bucketCount; j++) {
      buckets[j] = [];
    }
  
    // Elemente in die Eimer einsortieren
    for (var k = 0; k < n; k++) {
      var bucketIndex = Math.floor((arr[k] - min) / bucketSize);
      buckets[bucketIndex].push(arr[k]);
  
      // Schritt aufzeichnen
      steps.push({
        index: k,
        value: arr[k],
        bucket: bucketIndex,
      });
    }
  
    // Eimer sortieren und in das Ausgabearray einfügen
    var sortedArr = [];
    for (var l = 0; l < bucketCount; l++) {
      buckets[l].sort(function(a, b) {
        return a - b;
      });
  
      sortedArr = sortedArr.concat(buckets[l]);
    }
  
    // Schritte-Array zurückgeben
    return steps;
  }
  
  // Beispielaufruf
  var array = [29, 13, 22, 37, 52, 49, 46, 71, 56];
  var sortingSteps = bucketSort(array);
  
  // Ausgabe der Schritte auf der Konsole
  for (var step of sortingSteps) {
    console.log(`Index: ${step.index}, Wert: ${step.value}, Eimer: ${step.bucket}`);
  }
  
  // Ausgabe des sortierten Arrays
  console.log("Sortiertes Array: ", array);
  