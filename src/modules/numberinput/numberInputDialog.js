export default class numberInput {
    constructor(numberOfInputFields, title, labels) {
        this.windowTitle = title;
        this.numberOfInputs = numberOfInputFields;
        this.labels = labels;
        this.init();
    }

    init() {
        var frame = window.open("./modules/numberinput/numberInput.html", 'targetWindow',
            `toolbar=no,
        location=no,
        status=no,
        menubar=no,
        scrollbars=no,
        resizable=no,
        width=500,
        height=430`, "popup");
        var html = this.generateHTML(this.windowTitle, this.generateInputFieldsForDialog(this.numberOfInputs));
        frame.document.write(html);
        return frame;
    }

    generateInputFieldsForDialog(times) {
        var inputFields = "";
        for (let i = 0; i < times; i++) {
            inputFields += `<a>${this.labels[i]} </a><input class="input" id="input${i}" type="text"></input><br>`;
        }
        return inputFields;
    }

    generateHTML(title, htmlInputFields) {
        var htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
        <title>GraphIT-${title}</title>
        <style>
            body {
            font-size: 24px;
            text-align: center;
            }

            #input {
            width: 200px;
            height: 40px;
            font-size: 24px;
            margin-bottom: 10px;
            }

            .number-button {
            display: inline-block;
            width: 60px;
            height: 60px;
            line-height: 60px;
            font-size: 24px;
            margin: 5px;
            background-color: #ccc;
            border-radius: 50%;
            cursor: pointer;
            }

            #backspace-button {
                background-color: #ff5050;
            }

            #ok-button {
                background-color: #4CAF50;
            }
        </style>
        </head>

        <body>
            
        ${htmlInputFields}
        <div>
            <div class="number-button" onclick="appendToInput(1)">1</div>
            <div class="number-button" onclick="appendToInput(2)">2</div>
            <div class="number-button" onclick="appendToInput(3)">3</div>
        </div>
        <div>
            <div class="number-button" onclick="appendToInput(4)">4</div>
            <div class="number-button" onclick="appendToInput(5)">5</div>
            <div class="number-button" onclick="appendToInput(6)">6</div>
        </div>
        <div>
            <div class="number-button" onclick="appendToInput(7)">7</div>
            <div class="number-button" onclick="appendToInput(8)">8</div>
            <div class="number-button" onclick="appendToInput(9)">9</div>
        </div>
        <div>
            <div class="number-button" onclick="appendToInput(0)">0</div>
            <div class="number-button" id="backspace-button" onclick="removeLastCharacter()">&#9003;</div>
            <div class="number-button" id="ok-button" onclick="ok()">OK</div>
        </div>

        <script>
            var ret=[];
            var inputs = document.querySelectorAll(".input");
            var selected=null;
            let messagesSent=false;

            inputs.forEach(function(input) {
            input.addEventListener("click", function() {
                selected = input;
            });
            });

            function appendToInput(number) {
                if(selected!=null){
                    selected.value += number;
                }
            }

            function removeLastCharacter() {
                if(selected!=null){  
                    selected.value = selected.value.slice(0, -1);
                }
            }

            function ok() {
                if (messagesSent) {
                    return;
                  }
                for(let i=0;i<inputs.length;i++){ 
                    ret.push(inputs[i].value);
                }
                window.opener.postMessage(ret, "*");
                self.close();
                messagesSent=true;
            }
        </script>
        </body>

        </html>

        `;
        return htmlContent;
    }

}