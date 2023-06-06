function selectionSort(arr) {
    const steps = []; // Array zum Protokollieren der Schritte
  
    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
  
      // Finde das kleinste Element ab der aktuellen Position i
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
  
      // Vertausche das kleinste Element mit dem Element an der Position i
      const temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
  
      // Protokolliere den aktuellen Schritt
      steps.push([...arr]);
    }
  
    return steps;
  }
  
  // Beispielaufruf
  const array = [64, 25, 12, 22, 11];
  const steps = selectionSort(array);
  
  // Gib die protokollierten Schritte aus
  steps.forEach((step, index) => {
    console.log(`Schritt ${index + 1}: [${step.join(', ')}]`);
  });
  