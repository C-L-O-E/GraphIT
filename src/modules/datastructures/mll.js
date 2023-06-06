class ListNode {
    constructor(data) {
      this.data = data;
      this.prev = null;
      this.next = null;
    }
  }
  
export default class DoublyLinkedList{
    constructor(connectEnds,viewId) {
      this.head = null;
      this.tail = null;
      this.connectEnds = connectEnds;
      this.listBoxHeight=80;
      this.listBoxWidth=120;
      this.view=document.getElementById(viewId);
      this.listDiv=document.createElement('div');
      this.listDiv.className="listView";
      this.view.appendChild(this.listDiv);
      this.listBoxColor="white";
      this.xpos=100;
      this.ypos=100;
      this.offset=50;
    }
  
    // Füge ein Element am Anfang der Liste hinzu
    addFirst(data) {
      const newNode = new ListNode(data);
  
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
      }
  
      if (this.connectEnds) {
        this.tail.next = this.head;
        this.head.prev = this.tail;
      }
    }
  
    // Füge ein Element am Ende der Liste hinzu
    addLast(data) {
      const newNode = new ListNode(data);
  
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
      }
  
      if (this.connectEnds) {
        this.tail.next = this.head;
        this.head.prev = this.tail;
      }
    }
  
    // Füge ein Element an einem gegebenen Index hinzu
    insertAtIndex(index, data) {
      if (index === 0) {
        this.addFirst(data);
        return;
      }
  
      const newNode = new ListNode(data);
      let current = this.head;
      let currentIndex = 0;
  
      while (current && currentIndex < index) {
        current = current.next;
        currentIndex++;
      }
  
      if (!current) {
        this.addLast(data);
      } else {
        newNode.prev = current.prev;
        newNode.next = current;
        current.prev.next = newNode;
        current.prev = newNode;
      }
  
      if (this.connectEnds && currentIndex === index) {
        this.tail.next = this.head;
        this.head.prev = this.tail;
      }
    }
  
    // Entferne das erste Element der Liste
    removeFirst() {
      if (!this.head) {
        return;
      }
  
      if (this.head === this.tail) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head.next;
        this.head.prev = null;
      }
  
      if (this.connectEnds) {
        this.tail.next = this.head;
        this.head.prev = this.tail;
      }
    }
  
    // Entferne das letzte Element der Liste
    removeLast() {
      if (!this.tail) {
        return;
      }
  
      if (this.head === this.tail) {
        this.head = null;
        this.tail = null;
      } else {
        this.tail = this.tail.prev;
        this.tail.next = null;
      }
  
      if (this.connectEnds) {
        this.tail.next = this.head;
        this.head.prev = this.tail;
      }
    }
  
    // Entferne ein Element an einem gegebenen Index
    removeAtIndex(index) {
      if (index === 0) {
        this.removeFirst();
        return;
      }
  
      let current = this.head;
      let currentIndex = 0;
  
      while (current && currentIndex < index) {
        current = current.next;
        currentIndex++;
      }
  
      if (!current) {
        return;
      }
  
      if (current === this.tail) {
        this.removeLast();
      } else {
        current.prev.next = current.next;
        current.next.prev = current.prev;
      }
  
      if (this.connectEnds && currentIndex === index) {
        this.tail.next = this.head;
        this.head.prev = this.tail;
      }
    }
  
    // Entferne ein Element mit bestimmten Daten
    removeByData(data) {
      let current = this.head;
  
      while (current) {
        if (current.data === data) {
          if (current === this.head) {
            this.removeFirst();
          } else if (current === this.tail) {
            this.removeLast();
          } else {
            current.prev.next = current.next;
            current.next.prev = current.prev;
          }
  
          if (this.connectEnds) {
            this.tail.next = this.head;
            this.head.prev = this.tail;
          }
  
          return;
        }
  
        current = current.next;
      }
    }
  
    // Überprüfe, ob die Liste leer ist
    isEmpty() {
      return this.head === null;
    }
  
    // Gibt die Liste als Array aus
    toArray() {
      const result = [];
      let current = this.head;
  
      while (current) {
        result.push(current.data);
        current = current.next;
  
        if (current === this.head) {
          break;
        }
      }
  
      return result;
    }


    
    drawArrowLeftToRight(startX,startY,endX,endY){
      var arrowDiv=document.createElement('div');
      var arrowSVG=`<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg"><polyline points="${startX},${startY},${endX},${endY},${endX-10},${endY-10},${endX},${endY},${endX-10},${endY+10}" fill="none" stroke="white" /></svg>`;
      arrowDiv.className="arrowDiv";
      arrowDiv.style.position="absolute";
      arrowDiv.style.top=startY;
      arrowDiv.innerHTML=arrowSVG;
      this.listDiv.appendChild(arrowDiv);
      return null;
  
      }
  
      drawArrowRightToLeft(startX,startY,endX,endY){
        var arrowDiv=document.createElement('div');
        var arrowSVG=`<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg"><polyline points="${endX},${endY+10},${endX-10},${endY},${endX},${endY-10},${endX-10},${endY}, ${startX},${startY}" fill="none" stroke="white" /></svg>`;
        arrowDiv.className="arrowDiv";
        arrowDiv.style.position="absolute";
        arrowDiv.style.top=startY;
        arrowDiv.innerHTML=arrowSVG;
        this.listDiv.appendChild(arrowDiv);
  
        return null;
    
        }
  
        newBox(value,x,y){
          var html='<a>'+value+'</a>';
          var box=document.createElement('div');
          box.className='listBox';
          box.style.top=y+'px';
          box.style.left=x+'px';
          box.style.width=this.listBoxWidth+'px';
          box.style.height=this.listBoxHeight+'px';
          box.style.position="absolute";
          box.style.backgroundColor=this.listBoxColor;
          box.style.borderRadius="20px";
          box.style.border = "2px solid black";
          box.style.textAlign="center";
          box.innerHTML=html;
          return box;
      }
  
        drawListBox(value,x,y){
          var temp=this.newBox(value,x,y); 
          this.listDiv.appendChild(temp);
        }
  
        draw(){
          var arr=this.toArray();
          for(let i=0;i<arr.length;i++){
              this.drawListBox(arr[i],this.xpos+(i*(this.listBoxWidth+this.offset)),this.ypos);
              this.drawArrowLeftToRight(this.xpos+(i*(this.listBoxWidth+this.offset))-this.offset,this.ypos+this.listBoxHeight/2-10,this.xpos+(i*(this.listBoxWidth+this.offset)),this.ypos+this.listBoxHeight/2-10);
              this.drawArrowRightToLeft(this.xpos+(i*(this.listBoxWidth+this.offset)),this.ypos+this.listBoxHeight/2+10,this.xpos-this.offset+12+(i*(this.listBoxWidth+this.offset)),this.ypos+this.listBoxHeight/2+10);
          }
        }
  
        update(){
          this.listDiv.innerHTML=null;
          this.draw();
        }
  }

 function test(){ 
  const myList = new DoublyLinkedList(false,'graphView');
myList.addFirst(3);
myList.addFirst(2);
myList.addFirst(1);
myList.addLast(4);
myList.addLast(5);

console.log(myList.toArray());

myList.removeFirst();
myList.removeLast();

console.log(myList.toArray()); 

myList.insertAtIndex(1, 10);
myList.insertAtIndex(0, 20);

console.log(myList.toArray());

myList.removeAtIndex(2);

console.log(myList.toArray()); 

myList.removeByData(20);

console.log(myList.toArray()); 

myList.draw();
}

//test()
