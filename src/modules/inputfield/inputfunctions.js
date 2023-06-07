var input = document.getElementById('input');

function appendCharacter(character) {
    input.value += character;
  }

  function remove() {
    input.value=input.value.substring(0, input.value.length - 1);
  }

function ok(){
  window.opener.postMessage(input.value, "*");
  self.close();
}



  