var firstValue = 0;
var secondValue = 0;
var currentOp = 0;
var numMode = 0;
var result = 0;
var primaryDisplayArr = [];
var secondaryDisplayArr = [];
var haveDec = false; //is there a decimal already being used


function add(a, b) {

    return Number(a)+Number(b);
}

function sub(a, b) {

    return a-b;
}

function mul(a, b) {

    return a * b;
}

function div(a, b) {
    if (b === 0 || b === "0") {
        return "ERROR!  Divide by zero";
    } else return a / b;
}

function operate(operator, a, b){

    switch (operator) {
        case "+":
            return add(a,b);
        case "-":
            return sub(a,b);
        case "x":
            return mul(a,b);
        case "%":
            return div(a,b);
    }
}

function changeDisplay (num) {
    const display = document.getElementById("display");
        

}

const buttons = document.getElementById("buttons");

buttons.addEventListener("click", function(e){
    const button = e.target;
    keyActions(button);

});

document.addEventListener('keydown', function(e){

    const keyy = document.querySelector(`button[data-key="${e.keyCode}"]`);
    if (!keyy){
        return;
    }
    keyActions(keyy);
});

function keyActions(button) {

    const primaryDisplay = document.getElementById("primary-display");
    const resultDisplay = document.getElementById("result-display");
    const buttonText = button.innerText;

    if (button.classList.contains("num")) {
        //if (resultDisplay === ""){
            //Still adding numbers
            //primaryDisplay.textContent += buttonText;
       // } else {
            //new operation not using previous so clear
        if (currentOp === "="){
            resultDisplay.textContent = "";
            currentOp = 0;
        }
        if (numMode === 0){ //if we just hit an operator key, enter new number mode
            primaryDisplayArr = []; //clear the array for backspace to work correctly
            primaryDisplayArr.push(buttonText);
            primaryDisplay.textContent = buttonText;
            primaryMinusOne = "";
            resultDisplay.textContent +=buttonText;
            numMode = 1;
        } else { //if not, we're in number mode and can continue entering our number
            primaryDisplayArr.push(buttonText);
            primaryDisplay.textContent += buttonText;
            resultDisplay.textContent +=buttonText;
        }
    } else if (button.classList.contains("op")) {
        if (buttonText !== "=" && buttonText !== "Clear") { //if it's not equal or clear
            haveDec = false; //can do a new decimal since the previous number has finished
            if (numMode === 1) { // if we just typed a number and now are operating
                numMode = 0;

                if (currentOp === 0 || currentOp === "=") { //if there wasn't a previous operation in the series
                    currentOp = buttonText;
                    //Add new display value to variable
                    firstValue = parseFloat(primaryDisplay.textContent);
                    resultDisplay.textContent +=buttonText;
                    
                } 
                else { //if there was a previous operation just operate and continue operating on result
                    

                    secondValue = parseFloat(primaryDisplay.textContent);
                    result = operate(currentOp, firstValue, secondValue);

                    currentOp = buttonText;
                    primaryDisplay.textContent = result;
                    //Add new display value to variable
                    firstValue = parseFloat(result);
                    resultDisplay.textContent +=buttonText;

                }
            } else { //if we just entered another operation, just replace previous 
                resultDisplay.textContent = resultDisplay.textContent.slice(0, -1);
                currentOp = buttonText;
                resultDisplay.textContent +=buttonText;
            }

         } 
                

            
    
        else if (buttonText === "=" && currentOp !== 0 && numMode === 1) { //equal only works with an entered #

            secondValue = parseFloat(primaryDisplay.textContent);
            result = operate(currentOp, firstValue, secondValue);
            primaryDisplay.textContent = result;
            currentOp = "="; 
            primaryValue = parseFloat(result);
            secondValue = 0;
            console.log(firstValue + secondValue);
        }


    }

    if (buttonText === "Clear") {
        firstValue = 0;
        secondValue = 0;
        currentOp = 0;
        numMode = 0;
        result = 0;
        primaryDisplay.textContent = "";
        resultDisplay.textContent = "";
    }

    if (buttonText === "Back") {
        primaryDisplayArr.pop();
        primaryDisplay.textContent = primaryDisplayArr.join("");
        resultDisplay.textContent = "";
    }

    if (buttonText === "."){
        if (haveDec === false) {
            haveDec = true;
            
            if (numMode === 0){ //if we just hit an operator key, enter new number mode
                primaryDisplayArr.push(buttonText);
                primaryDisplay.textContent = buttonText;
                primaryMinusOne = "";
                resultDisplay.textContent +=buttonText;
                numMode = 1;
            } else { //if not, we're in number mode and can continue entering our number
                primaryDisplayArr.push(buttonText);
                primaryDisplay.textContent += buttonText;
                resultDisplay.textContent +=buttonText;
            }

        }

    }



}