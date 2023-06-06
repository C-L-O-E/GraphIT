function combSort(arr) {
    var n = arr.length;
    if (n === 0) {
      return arr;
    }
  
    // Schritte-Array für die Aufzeichnung der Sortierschritte
    var steps = [];
  
    // Comb-Sort-Algorithmus
    var gap = n;
    var shrink = 1.3;
    var sorted = false;
  
    while (!sorted) {
      gap = Math.floor(gap / shrink);
      if (gap <= 1) {
        gap = 1;
        sorted = true;
      }
  
      var i = 0;
      while (i + gap < n) {
        if (arr[i] > arr[i + gap]) {
          // Elemente tauschen
          var temp = arr[i];
          arr[i] = arr[i + gap];
          arr[i + gap] = temp;
  
          // Schritt aufzeichnen
          steps.push({
            index1: i,
            index2: i + gap,
            gap: gap,
          });
  
          sorted = false;
        }
        i++;
      }
    }
  
    // Schritte-Array zurückgeben
    return steps;
  }
  
  // Beispielaufruf
  var array = [29, 13, 22, 37, 52, 49, 46, 71, 56];
  var sortingSteps = combSort(array);
  
  // Ausgabe der Schritte auf der Konsole
  for (var step of sortingSteps) {
    console.log(`Index1: ${step.index1}, Index2: ${step.index2}, Gap: ${step.gap}`);
  }
  
  // Ausgabe des sortierten Arrays
  console.log("Sortiertes Array: ", array);
  