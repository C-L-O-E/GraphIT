export default class stack{
    constructor(){
        this.stack = [];
        this.stackBoxHeight=80;
        this.stackBoxWidth=120;
        this.view=document.getElementById('graphView');
        this.stackDiv=document.createElement('div');
        this.stackDiv.className="stackView";
        this.view.appendChild(this.stackDiv);
        this.stackBoxColor="white";
        this.xpos=100;
        this.ypos=100;
    }

    push(data){
        this.stack.push(data);
      
    }

    pop(){
        if(this.stack.length==0){
            return null;
        }else{
            let data = this.stack.pop();
            return data;
        }
    }
    
    peak(){
        return this.items[this.items.length - 1];
    }

    isEmpty(){
    return this.items.length == 0;
    }

    stringStack(){
    var str = "";
    for (var i = 0; i < this.stack.length; i++)
        str += this.stack[i] + " ";
    return str;
    }

    newBox(value,x,y){
        var html='<a>'+value+'</a>';
        var box=document.createElement('div');
        box.className='stackyBox';
        box.style.top=y+'px';
        box.style.left=x+'px';
        box.style.width=this.stackBoxWidth+'px';
        box.style.height=this.stackBoxHeight+'px';
        box.style.position="absolute";
        box.style.backgroundColor=this.stackBoxColor;
        box.style.border = "2px solid black";
        box.style.textAlign="center";
        box.innerHTML=html;
        return box;
    }

    drawStackBox(value,x,y){
        var temp=this.newBox(value,x,y);
        this.stackDiv.appendChild(temp);
        return true;
    }

    draw(){
        for(let i=0;i<this.stack.length;i++){
            this.drawStackBox(this.stack[i],this.xpos,this.ypos+(i*this.stackBoxHeight));
        }
    }

    update(){
        this.stackDiv.innerHTML=null;
        this.draw();
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
}



