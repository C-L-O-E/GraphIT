function cocktailSort(arr) {
    var n = arr.length;
    if (n === 0) {
      return arr;
    }
  
    // Schritte-Array für die Aufzeichnung der Sortierschritte
    var steps = [];
  
    // Cocktail-Sort-Algorithmus
    var start = 0;
    var end = n - 1;
    var swapped;
  
    do {
      swapped = false;
  
      // Aufwärtsschritt
      for (var i = start; i < end; i++) {
        if (arr[i] > arr[i + 1]) {
          // Elemente tauschen
          var temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
  
          // Schritt aufzeichnen
          steps.push({
            index1: i,
            index2: i + 1,
            direction: "Aufwärts",
          });
  
          swapped = true;
        }
      }
  
      if (!swapped) {
        // Wenn keine Elemente getauscht wurden, ist das Array bereits sortiert
        break;
      }
  
      swapped = false;
      end--;
  
      // Abwärtsschritt
      for (var j = end; j >= start; j--) {
        if (arr[j] > arr[j + 1]) {
          // Elemente tauschen
          var temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
  
          // Schritt aufzeichnen
          steps.push({
            index1: j,
            index2: j + 1,
            direction: "Abwärts",
          });
  
          swapped = true;
        }
      }
  
      start++;
    } while (swapped);
  
    // Schritte-Array zurückgeben
    return steps;
  }
  
  // Beispielaufruf
  var array = [29, 13, 22, 37, 52, 49, 46, 71, 56];
  var sortingSteps = cocktailSort(array);
  
  // Ausgabe der Schritte auf der Konsole
  for (var step of sortingSteps) {
    console.log(`Index1: ${step.index1}, Index2: ${step.index2}, Richtung: ${step.direction}`);
  }
  
  // Ausgabe des sortierten Arrays
  console.log("Sortiertes Array: ", array);
  