var input = document.getElementById('input');

function appendCharacter(character) {
    input.value += character;
  }

function remove(){
  input.value =input.Value.substring(0, inputValue.length - 1);
}

function ok(){
  window.opener.postMessage(input.value, "*");
}
  

  