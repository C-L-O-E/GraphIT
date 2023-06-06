export class ListNode{
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }
  
export default class LinkedList{
    constructor(viewId) {
      this.head = null;
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
      newNode.next = this.head;
      this.head = newNode;
    }
  
    // Füge ein Element am Ende der Liste hinzu
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
    }
  
    // Füge ein Element an einem gegebenen Index hinzu
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
    }
  
    // Entferne das erste Element der Liste
    removeFirst() {
      if (!this.head) {
        return;
      }
  
      this.head = this.head.next;
    }
  
    // Entferne das letzte Element der Liste
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
    }
  
    // Entferne ein Element an einem gegebenen Index
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
          return; // Index außerhalb der Liste
        }
  
        currentIndex++;
      }
  
      previous.next = current.next;
    }
  
    // Entferne ein Element mit bestimmten Daten
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
      var arrowSVG=`<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><polyline points="${endX},${endY+10},${endX-10},${endY},${endX},${endY-10},${endX-10},${endY}, ${startX},${startY}" fill="none" stroke="white" /></svg>`;
      arrowDiv.className="arrowDiv";
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
            this.drawArrowLeftToRight(this.xpos+(i*(this.listBoxWidth+this.offset))-this.offset,this.ypos+this.listBoxHeight/2,this.xpos+(i*(this.listBoxWidth+this.offset)),this.ypos+this.listBoxHeight/2);
        }
      }

      update(){
        this.listDiv.innerHTML=null;
        this.draw();
      }

  }


   const list =new LinkedList('graphView');
function test(){
  list.addFirst(1);
  list.addFirst(3);
  list.addFirst(4);
  list.addFirst(5);
  list.addLast(10);
  console.log(list.toArray());

  list.insertAtIndex(1,50);

  console.log(list.toArray());
  list.removeAtIndex(1);
  console.log(list.toArray());
  list.removeByData(3);
  console.log(list.toArray());
  var view = document.getElementById("graphView");
  var listDiv=document.createElement('div');
  view.appendChild(listDiv);
  function addBox(x,y,value){
    var arrBox=document.createElement('div');
    arrBox.className="listyBox";
    arrBox.style.left=x+"px";
    arrBox.style.top=y+"px";
    arrBox.textContent=value;
    listDiv.appendChild(arrBox);
}
  var temp=list.head;
  for(let i=0;i<list.toArray().length;i++){
        console.log(temp.data);  
        addBox(50+120*i,100,temp.data)
        temp=temp.next;
  }
 

}
/*
 list.addFirst(1);
  list.addFirst(3);
  list.addFirst(4);
  list.addFirst(5);
  list.addLast(10);
//list.drawArrowRightToLeft(150,100,10,100);
//list.drawArrowLeftToRight(10,30,150,30);
//list.draw();


 */
test();
