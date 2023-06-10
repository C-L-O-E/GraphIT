function radixSort(arr) {
  // Erstelle eine Kopie des Arrays, um das ursprüngliche Array nicht zu ändern
  const sortedArr = [...arr];

  // Bestimme die maximale Anzahl an Stellen im größten Element
  const maxDigits = getMaxDigits(sortedArr);

  // Erstelle ein Array, um die Schritte zu protokollieren
  const log = [];

  // Führe den Radix Sort für jede Stelle von rechts nach links aus
  for (let i = 0; i < maxDigits; i++) {
    // Erstelle ein Array für jede Ziffer (0-9)
    const buckets = Array.from({
      length: 10
    }, () => []);

    // Verteile die Elemente in die entsprechenden Eimer
    for (let j = 0; j < sortedArr.length; j++) {
      const num = getDigit(sortedArr[j], i);
      buckets[num].push(sortedArr[j]);
    }

    // Kombiniere die Eimer in der richtigen Reihenfolge
    sortedArr.splice(0);
    for (let k = 0; k < buckets.length; k++) {
      sortedArr.push(...buckets[k]);
    }

    // Protokolliere den aktuellen Schritt
    const stepLog = [];
    for (let m = 0; m < sortedArr.length; m++) {
      if (sortedArr[m] !== arr[m]) {
        const swapInfo = {
          fromIndex: m,
          toIndex: arr.indexOf(sortedArr[m])
        };
        stepLog.push(swapInfo);
      }
    }
    log.push(stepLog);
  }

  // Gib das sortierte Array und die Protokolldaten zurück
  return {
    sortedArr,
    log
  };
}

// Bestimmt die maximale Anzahl an Stellen im größten Element
function getMaxDigits(arr) {
  let maxDigits = 0;
  for (let i = 0; i < arr.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(arr[i]));
  }
  return maxDigits;
}

// Bestimmt die Anzahl der Stellen einer Zahl
function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

// Gibt die Ziffer an der gegebenen Stelle zurück
function getDigit(num, place) {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

// Beispielaufruf
const array = [170, 45, 75, 90, 802, 24, 2, 66];
const result = radixSort(array);

console.log('Sortiertes Array:', result.sortedArr);
console.log('Protokollierte Schritte:');
result.log.forEach((step, index) => {
  console.log(`Schritt ${index + 1}:`);
  step.forEach(swapInfo => {
    console.log(`- Tausch von Index ${swapInfo.fromIndex} mit Index ${swapInfo.toIndex}`);
  });
});