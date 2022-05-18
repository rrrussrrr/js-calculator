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