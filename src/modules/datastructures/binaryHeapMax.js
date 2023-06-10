class MaxHeap {
  constructor() {
    this.heap = [];
  }

  parent(i) {
    return Math.floor((i - 1) / 2);
  }

  leftChild(i) {
    return 2 * i + 1;
  }

  rightChild(i) {
    return 2 * i + 2;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  insert(value) {
    this.heap.push(value);
    let currentIndex = this.heap.length - 1;

    while (currentIndex !== 0 && this.heap[currentIndex] > this.heap[this.parent(currentIndex)]) {
      const parentIndex = this.parent(currentIndex);
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
    }
  }

  extractMax() {
    if (this.heap.length === 0) {
      return null;
    }

    const max = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();

    this.maxHeapify(0);

    return max;
  }

  maxHeapify(i) {
    const left = this.leftChild(i);
    const right = this.rightChild(i);
    let largest = i;

    if (left < this.heap.length && this.heap[left] > this.heap[largest]) {
      largest = left;
    }

    if (right < this.heap.length && this.heap[right] > this.heap[largest]) {
      largest = right;
    }

    if (largest !== i) {
      this.swap(i, largest);
      this.maxHeapify(largest);
    }
  }

  dump() {
    return this.heap;
  }

  calculateNodePositions() {
    const nodePositions = {};
    this.calculatePosition(0, 0, this.heap.length - 1, nodePositions);
    return nodePositions;
  }

  calculatePosition(index, level, maxIndex, nodePositions) {
    var ofset = 100;
    if (index > maxIndex) {
      return;
    }

    const x = (Math.pow(2, level) - 1 + index) * 10 + ofset;
    const y = level * 10;

    nodePositions[this.heap[index]] = {
      x,
      y
    };

    this.calculatePosition(this.leftChild(index), level + 1, maxIndex, nodePositions);
    this.calculatePosition(this.rightChild(index), level + 1, maxIndex, nodePositions);
  }

}

var heap = new MaxHeap();
heap.insert(1);
heap.insert(2);
heap.insert(10);

console.log(heap.dump());
var t = heap.calculateNodePositions()
console.log(t);