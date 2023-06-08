export default class stack {
    constructor() {
      this.stack = [];
      this.stackBoxHeight = 80;
      this.stackBoxWidth = 120;
      this.view = document.getElementById('graphView');
      this.stackDiv = document.createElement('div');
      this.stackDiv.className = 'stackView';
      this.view.appendChild(this.stackDiv);
      this.stackBoxColor = 'white';
      this.xpos = 100;
      this.ypos = 100;
    }
  
    push(data) {
      this.stack.push(data);
      this.update();
      this.animatePush();   
    }
  
   async pop() {
      if (this.stack.length == 0) {
        this.update();
        return null;
      } else {
        let data = this.stack.pop();
        this.update();
        this.animatePop();
        return data;
      }
    }
  
    clearDS() {
      this.stackDiv.innerHTML = null;
      this.stack = [];
    }
  
    peak() {
        const topBox = this.stackDiv.firstChild;
        topBox.style.backgroundColor = 'lightgreen';
        this.sleep(1000);
        topBox.style.backgroundColor=this.stackBoxColor;
        return this.stack[this.stack.length - 1];
    }
  
    isEmpty() {
      return this.stack.length == 0;
    }
  
    stringStack() {
      var str = '';
      for (var i = 0; i < this.stack.length; i++)
        str += this.stack[i] + ' ';
      return str;
    }
  
    newBox(value, x, y) {
      var html = '<a>' + value + '</a>';
      var box = document.createElement('div');
      box.className = 'stackBox';
      box.style.top = y + 'px';
      box.style.left = x + 'px';
      box.style.width = this.stackBoxWidth + 'px';
      box.style.height = this.stackBoxHeight + 'px';
      box.style.position = 'absolute';
      box.style.backgroundColor = this.stackBoxColor;
      box.style.border = '2px solid black';
      box.style.textAlign = 'center';
      box.innerHTML = html;
      return box;
    }
  
    drawStackBox(value, x, y) {
      var temp = this.newBox(value, x, y);
      this.stackDiv.appendChild(temp);
      return true;
    }
  
    draw() {
      for (let i = 0,j=this.stack.length; i < this.stack.length; i++,j--) {
        this.drawStackBox(this.stack[j-1], this.xpos, this.ypos + i * this.stackBoxHeight);
        }
    }
  
    update() {
      this.stackDiv.innerHTML = null;
      this.draw();
    }
  
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    
      async animatePush() {
        const topBox = this.stackDiv.firstChild;
        topBox.style.backgroundColor = 'lightgreen';
    
        await this.sleep(1000);
    
        topBox.style.backgroundColor = this.stackBoxColor;
      }

        async moveDivsUp(className) {
        const divElements = document.getElementsByClassName(className);
      
        for (let i = 0; i < divElements.length; i++) {
          const div = divElements[i];
          const currentTop = parseInt(div.style.top || '0');
          div.style.top = (currentTop - 1) + 'px';
        }
      }
    
      async animatePop() {
        const topBox = this.stackDiv.firstChild;
        topBox.style.backgroundColor = 'red';
        for(let i=0,j=0;i<300;i++){
            topBox.style.left = (topBox.offsetLeft + 1) + "px";
            if(i>this.stackBoxWidth&&j<=80){
                this.moveDivsUp('stackBox');
                j++;
            }
            await this.sleep(10);
        }
    
        await this.sleep(1000);
    
        this.stackDiv.removeChild(topBox);
        topBox.style.transform = 'none';
      }
  

    setX(x){
        this.xpos=x;
    }

    setY(y){
        this.ypos=y;
    }

    setPos(x,y){
        this.setX(x);
        this.setY(y);
    }

}
function test(){
var s= new stack();
s.push(1);
s.push(2);
s.push(3);
s.push(4);
s.push(5);

var str= s.stringStack();
console.log(str);

s.draw();
//s.pop();
s.push(1);
}

test();


