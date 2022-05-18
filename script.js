var firstValue = 0;
var secondValue = 0;
var currentOp = 0;


function add(a, b) {

    return a+b;
}

function sub(a, b) {

    return a-b;
}

function mul(a, b) {

    return a * b;
}

function div(a, b) {

    return a / b;
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
            if (b===0) {
                return "ERROR: Divide By Zero";
            } else return div(a,b);
    }
}

function changeDisplay (num) {
    const display = document.getElementById("display");
        

}

const buttons = document.getElementById("buttons");

buttons.addEventListener("click", function(e){
    const button = e.target;
    const primaryDisplay = document.getElementById("primary-display");
    const resultDisplay = document.getElementById("result-display");
    const buttonText = button.innerText;
    if (button.classList.contains("num")) {
        if (resultDisplay === ""){
            //Still adding numbers
            primaryDisplay.textContent += buttonText;
        } else {
            //new operation not using previous so clear
            resultDisplay.textContent = "";
        }
    } else if (button.classList.contains("op")) {
        if (buttonText !== "=" && buttonText !== "Clear") {
            currentOp = buttonText;
            //Add new display value to variable
            firstValue = primaryDisplay.textContent;
            primaryDisplay.textContent = "";
        }
        else if (buttonText === "=") {
            secondValue = primaryDisplay.textContent;
            let result = operate(currentOp, firstValue, secondValue);
            primaryDisplay.textContent = result;
            currentOp = 0; 
        }
    }



})