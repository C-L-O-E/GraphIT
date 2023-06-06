function gnomeSort(arr) {
    var n = arr.length;
    if (n === 0) {
      return arr;
    }
  
    // Schritte-Array für die Aufzeichnung der Sortierschritte
    var steps = [];
  
    // Gnome-Sort-Algorithmus
    var i = 0;
    while (i < n) {
      if (i === 0 || arr[i] >= arr[i - 1]) {
        i++;
      } else {
        // Elemente tauschen
        var temp = arr[i];
        arr[i] = arr[i - 1];
        arr[i - 1] = temp;
  
        // Schritt aufzeichnen
        steps.push({
          index1: i,
          index2: i - 1,
        });
  
        i--;
      }
    }
  
    // Schritte-Array zurückgeben
    return steps;
  }
  
  // Beispielaufruf
  var array = [29, 13, 22, 37, 52, 49, 46, 71, 56];
  var sortingSteps = gnomeSort(array);
  
  // Ausgabe der Schritte auf der Konsole
  for (var step of sortingSteps) {
    console.log(`Index1: ${step.index1}, Index2: ${step.index2}`);
  }
  
  // Ausgabe des sortierten Arrays
  console.log("Sortiertes Array: ", array);
  