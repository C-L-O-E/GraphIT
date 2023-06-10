export class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export default class LinkedList {
  constructor(viewId) {
    this.head = null;
    this.listBoxHeight = 80;
    this.listBoxWidth = 120;
    this.view = document.getElementById(viewId);
    this.listDiv = document.createElement('div');
    this.listDiv.className = "listView";
    this.view.appendChild(this.listDiv);
    this.listBoxColor = "white";
    this.xpos = 100;
    this.ypos = 100;
    this.offset = 50;
  }


  addFirst(data) {
    const newNode = new ListNode(data);
    newNode.next = this.head;
    this.head = newNode;
    this.update();
  }


  addLast(data) {
    const newNode = new ListNode(data);

    if (!this.head) {
      this.head = newNode;
      return;
    }

    let current = this.head;
    while (current.next) {
      current = current.next;
    }

    current.next = newNode;
    this.update();
  }


  insertAtIndex(index, data) {
    if (index === 0) {
      this.addFirst(data);
      return;
    }

    const newNode = new ListNode(data);
    let current = this.head;
    let previous = null;
    let currentIndex = 0;

    while (currentIndex < index) {
      previous = current;
      current = current.next;

      if (!current) {
        break;
      }

      currentIndex++;
    }

    newNode.next = current;
    previous.next = newNode;
    this.update();
  }


  removeFirst() {
    if (!this.head) {
      return;
    }

    this.head = this.head.next;
    this.update();
  }


  removeLast() {
    if (!this.head) {
      return;
    }

    if (!this.head.next) {
      this.head = null;
      return;
    }

    let previous = null;
    let current = this.head;

    while (current.next) {
      previous = current;
      current = current.next;
    }

    previous.next = null;
    this.update();
  }


  removeAtIndex(index) {
    if (index === 0) {
      this.removeFirst();
      return;
    }

    let current = this.head;
    let previous = null;
    let currentIndex = 0;

    while (currentIndex < index) {
      previous = current;
      current = current.next;

      if (!current) {
        return;
      }

      currentIndex++;
    }

    previous.next = current.next;
    this.update();
  }


  removeByData(data) {
    if (!this.head) {
      return;
    }

    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }

    let previous = null;
    let current = this.head;

    while (current) {
      if (current.data === data) {
        previous.next = current.next;
        return;
      }

      previous = current;
      current = current.next;
    }
    this.update();
  }


  isEmpty() {
    return this.head === null;
  }


  toArray() {
    const result = [];
    let current = this.head;

    while (current) {
      result.push(current.data);
      current = current.next;
    }

    return result;
  }

  drawArrowLeftToRight(startX, startY, endX, endY) {

    var arrowDiv = document.createElement('div');
    let y = startY - 30;
    var arrowSVG = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><polyline points="${startX},${y},${endX},${y},${endX-10},${y-10},${endX},${y},${endX-10},${y+10}" fill="none" stroke="white" /></svg>`;
    arrowDiv.className = "arrowDiv";
    arrowDiv.style.position = "absolute";
    arrowDiv.style.top = startY + "px";
    arrowDiv.style.left = startX + "px";
    arrowDiv.innerHTML = arrowSVG;
    this.listDiv.appendChild(arrowDiv);
    return null;

  }

  drawArrowRightToLeft(startX, startY, endX, endY) {
    startY = startY - 30;
    var arrowDiv = document.createElement('div');
    var arrowSVG = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><polyline points="${endX},${endY+10},${endX-10},${endY},${endX},${endY-10},${endX-10},${endY}, ${startX},${startY}" fill="none" stroke="white" /></svg>`;
    arrowDiv.className = "arrowDiv";
    arrowDiv.style.position = "absolute";
    arrowDiv.style.top = startY + "px";
    arrowDiv.style.left = startX + "px";
    arrowDiv.innerHTML = arrowSVG;
    this.listDiv.appendChild(arrowDiv);

    return null;

  }

  newBox(value, x, y) {
    var html = '<a>' + value + '</a>';
    var box = document.createElement('div');
    box.className = 'listBox';
    box.style.top = y + 'px';
    box.style.left = x + 'px';
    box.style.width = this.listBoxWidth + 'px';
    box.style.height = this.listBoxHeight + 'px';
    box.style.position = "absolute";
    box.style.backgroundColor = this.listBoxColor;
    box.style.borderRadius = "20px";
    box.style.border = "2px solid black";
    box.style.textAlign = "center";
    box.innerHTML = html;
    return box;
  }

  drawListBox(value, x, y) {
    var temp = this.newBox(value, x, y);
    this.listDiv.appendChild(temp);
  }

  draw() {
    var arr = this.toArray();
    for (let i = 0; i < arr.length; i++) {
      this.drawListBox(arr[i], this.xpos + (i * (this.listBoxWidth + this.offset)), this.ypos);
      this.drawArrowLeftToRight(this.xpos + (i * (this.listBoxWidth + this.offset)) - this.offset, this.ypos + this.listBoxHeight / 2, this.xpos + (i * (this.listBoxWidth + this.offset)), this.ypos + this.listBoxHeight / 2);
    }
  }

  update() {
    this.listDiv.innerHTML = null;
    this.draw();
  }

}