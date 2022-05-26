var firstValue = 0;
var secondValue = 0;
var currentOp = 0;
var numMode = 0;
var result = 0;
var primaryDisplayArr = [];
var secondaryDisplayArr = [];
var haveDec = false; //is there a decimal already being used
var divZero = false;

const primaryDisplay = document.getElementById("primary-display");
const resultDisplay = document.getElementById("result-display");

primaryDisplayArr = [];
primaryDisplayArr.push("0");
primaryDisplay.textContent = "0";

function clearAll(){
    firstValue = 0;
    secondValue = 0;
    currentOp = 0;
    numMode = 0;
    result = 0;
    primaryDisplayArr = [];
    primaryDisplayArr.push("0");
    primaryDisplay.textContent = "0";
    secondaryDisplayArr = [];
    resultDisplay.textContent = "";
    divZero = false;
    haveDec = false;
}

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
        divZero = true;
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
        case "/":
            return div(a,b);
    }
}


const buttons = document.getElementById("buttons");

buttons.addEventListener("click", function(e){
    if (divZero) {
        clearAll();
    }
    const button = e.target;
    keyActions(button);

});

document.addEventListener('keydown', function(event){

    if (divZero) {
        clearAll();
    }

    const keyCode = event.key;
    const keyy = document.querySelector(`div[data-key="${event.key}"]`);
    const altKeyy = document.querySelector(`div[data-alt="${event.key}"]`);
    if (keyy){ //is there a button with this key assigned
        keyActions(keyy);
    } else if (altKeyy) {  // try alt key assignment
        keyActions(altKeyy);
    } else return;  // if a button without either main or alt key isn't found -> invalid keypress



});

function keyActions(button) {


    const buttonText = button.innerText;

    if (button.classList.contains("num")) {
        if (primaryDisplay.textContent === "0") {
            primaryDisplayArr = []; //its showing a zero and we want to replace it
            primaryDisplay.textContent = "";
        }
        if (currentOp === "="){
            resultDisplay.textContent = "";
            currentOp = 0;
        }
        if (numMode === 0){ //if we just hit an operator key, enter new number mode
            primaryDisplayArr = []; //clear the array for backspace to work correctly
            primaryDisplayArr.push(buttonText);
            primaryDisplay.textContent = buttonText;
            primaryMinusOne = "";
            numMode = 1;
        } else { //if not, we're in number mode and can continue entering our number

                if (primaryDisplayArr.length < 12 ) { //limtt number of digits so no overflow over side
                    primaryDisplayArr.push(buttonText);
                    primaryDisplay.textContent += buttonText;
                    //let test = primaryDisplay.textContent + buttonText;
                    //test = Number(test).toExponential(2);
                    //primaryDisplay.textContent =test;
                } //else primaryDisplay.textContent += buttonText;
            
        }
    } else if (button.classList.contains("op")) {
        if (buttonText !== "=" && buttonText !== "Clear") { //if it's not equal or clear
            haveDec = false; //can do a new decimal since the previous number has finished
            if (numMode === 1 || currentOp === "=") { // if we just typed a number or equalled and now are operating
                numMode = 0;

                if (currentOp === 0 || currentOp === "=") { //if there wasn't a previous operation in the series
                    currentOp = buttonText;
                    //Add new display value to variable
                    firstValue = parseFloat(primaryDisplay.textContent);

                    resultDisplay.textContent = primaryDisplay.textContent + " " + buttonText;
                    
                } 
                else { //if there was a previous operation just operate and continue operating on result
                    

                    secondValue = parseFloat(primaryDisplay.textContent);
                    result = operate(currentOp, firstValue, secondValue);
                    result = result.toFixed(7).replace(/\.?0+$/, '');
                    currentOp = buttonText;
                    if (result.length < 12 ) {
                        primaryDisplay.textContent = result;

                    } else {
                        primaryDisplay.textContent = Number(result).toExponential(2);
                    }
                    //Add new display value to variable
                    firstValue = parseFloat(result);

                    resultDisplay.textContent = primaryDisplay.textContent + " " + buttonText;

                }
            } else { //if we just entered another operation, just replace previous 

                currentOp = buttonText;
                resultDisplay.textContent = primaryDisplay.textContent + " " + buttonText;
            }

         } 
                

            
    
        else if (buttonText === "=" && currentOp !== 0 && numMode === 1) { //equal only works with an entered #

            secondValue = parseFloat(primaryDisplay.textContent);
            result = operate(currentOp, firstValue, secondValue);
            result = result.toFixed(7).replace(/\.?0+$/, '');
            if (result.length < 12 ) {
                primaryDisplay.textContent = result;

            } else {
                primaryDisplay.textContent = Number(result).toExponential(2);
            }
            currentOp = "="; 
            primaryValue = parseFloat(result);

            resultDisplay.textContent += " " + secondValue + " " + buttonText;
            secondValue = 0;
            numMode = 0;
        }


    }

    if (buttonText === "Clear") {
        clearAll();
    }

    if (buttonText === "±" && numMode === 1) {
        primaryDisplayArr = primaryDisplayArr.unshift("-");
        primaryDisplay.textContent = "-" + primaryDisplay.textContent;
    }

    if (buttonText === "Back") {
        if (numMode === 1) {
            primaryDisplayArr.pop();
            if (primaryDisplayArr.length === 0){
                primaryDisplayArr.push(0); //if you remove the last number, push a zero
            }
            primaryDisplay.textContent = primaryDisplayArr.join("");


        }
    }

    if (buttonText === "."){
        if (haveDec === false) {
            haveDec = true;
            
            if (numMode === 0){ //if we just hit an operator key, enter new number mode
                primaryDisplayArr.push(buttonText);
                primaryDisplay.textContent = buttonText;
                primaryMinusOne = "";

                numMode = 1;
            } else { //if not, we're in number mode and can continue entering our number
                primaryDisplayArr.push(buttonText);
                primaryDisplay.textContent += buttonText;
            }

        }

    }



}