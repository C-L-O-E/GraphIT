//realy similar to the original controlls only here as a work around TODO: clean that up later
var view=document.getElementById('controls');
var btnDatastructureOpperations=document.getElementById('iii');
var btnSetting=document.getElementById('iiii');
var btnControles=document.getElementById('ii');
var btnDatastructures=document.getElementById('i');
var viewElements = document.querySelectorAll('.viewElementC');

var settings=[];
var controls=[];
var datastructures=[];
var datastructureOperaions=[];

controls.push("clear view",'clear output','clear terminal','presentation',"Presentation-to-Second-Screen","End-Presentation","ZOOM-IN","ZOOM-OUT","ZOOM-PREVIEW-IN","ZOOM-PREVIEW-OUT","ZOOM-Preview-AUTO","back","EXIT");
datastructures.push("Binary-Search-Tree","Singel-linked-List","Mulit-Linked-List","Stack","Array","Graph","Clear-Selected","Remove-Selected");
datastructureOperaions.push("Array-insert","Array-Create","Array-Random-Create","Array-Random-Length-Create","Array-Simple-Creation","Array-Bubbelsort","Array-insertionSort","Array-selectionSort","BST-Random-Create","BST-Insert","BST-Remove","BST-Traverse-Inorder","BST-Travers-Preorder","BST-Traverse-Postorder","BST-Traverse-Levelorder","Stack-Push","Stack-pop","Stack-peak","SLL-Random-Create","SLL-Random-Creat-Length","SLL-Insert-End","SLL-Insert-Begining","SLL-Remove-Start","SLL-Remove-End","MLL-Random-Create","MLL-Random-Creat-Length","MLL-Insert-End","MLL-Insert-Begin","MLL-Remove-End","MLL-Remove-Begin","Graph-Tiefensuche","Graph-Breitensuche","Graph-Insert","Graph-Remove","Graph-Random-Create","Graph-Rendom-Lenght-Create","Graph-ResetColor");

function load(array){
    view.innerHTML=null;
    array.forEach(element => {
        var temp=document.createElement('div');
        temp.className="viewElementC";
        temp.innerHTML=`<a>${element}</a>`;
        view.appendChild(temp);
    });
}


function addEventListeners(){
    btnControles.addEventListener('click',event=>{
        load(controls);
        updateListener();
    });

    btnDatastructures.addEventListener('click',event=>{
        load(datastructures);
        updateListener();
    });

    btnSetting.addEventListener('click',event=>{
        load(settings);
        updateListener();
    });

    btnDatastructureOpperations.addEventListener('click',event=>{
        load(datastructureOperaions);
        updateListener();
    });
}

function updateListener(){
    viewElements = document.querySelectorAll('.viewElementC');
    viewElements.forEach((element) => {
    element.addEventListener('click', () => {
        const linkElement = element.querySelector('a');
        if (linkElement) {
        const text = linkElement.textContent;
        console.log('Text:', text);
        window.opener.postMessage(text, "*");
        }
    });
    });
}






