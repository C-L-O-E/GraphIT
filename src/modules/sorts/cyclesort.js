function cycleSort(arr) {
    var n = arr.length;
    if (n === 0) {
      return arr;
    }
  
    // Schritte-Array für die Aufzeichnung der Sortierschritte
    var steps = [];
  
    // Cycle-Sort-Algorithmus
    for (var cycleStart = 0; cycleStart < n - 1; cycleStart++) {
      var item = arr[cycleStart];
      var pos = cycleStart;
  
      // Das richtige Positionselement finden
      for (var i = cycleStart + 1; i < n; i++) {
        if (arr[i] < item) {
          pos++;
        }
      }
  
      // Wenn das Element bereits an der richtigen Position ist, zum nächsten Zyklus gehen
      if (pos === cycleStart) {
        continue;
      }
  
      // Das Element an seine richtige Position verschieben
      while (item === arr[pos]) {
        pos++;
      }
  
      var temp = arr[pos];
      arr[pos] = item;
      item = temp;
  
      // Schritt aufzeichnen
      steps.push({
        index1: cycleStart,
        index2: pos,
      });
  
      // Restliche Elemente an ihre richtigen Positionen verschieben
      while (pos !== cycleStart) {
        pos = cycleStart;
  
        for (var j = cycleStart + 1; j < n; j++) {
          if (arr[j] < item) {
            pos++;
          }
        }
  
        while (item === arr[pos]) {
          pos++;
        }
  
        var temp = arr[pos];
        arr[pos] = item;
        item = temp;
  
        // Schritt aufzeichnen
        steps.push({
          index1: cycleStart,
          index2: pos,
        });
      }
    }
  
    // Schritte-Array zurückgeben
    return steps;
  }
  
  // Beispielaufruf
  var array = [29, 13, 22, 37, 52, 49, 46, 71, 56];
  var sortingSteps = cycleSort(array);
  
  // Ausgabe der Schritte auf der Konsole
  for (var step of sortingSteps) {
    console.log(`Index1: ${step.index1}, Index2: ${step.index2}`);
  }
  
  // Ausgabe des sortierten Arrays
  console.log("Sortiertes Array: ", array);
  