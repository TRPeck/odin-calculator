function add(a,b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(op, a, b) {
    switch(op) {
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case '*':
            return multiply(a,b);
        case '/':
            return divide(a,b);
    }
}

function initializeButtons() {
    let firstNum = null;
    let secondNum = null;
    let operator = "";
    const nums = document.querySelectorAll(".btn.num");
    let dispValue = document.querySelector(".answer");
    let lastOperator = false;
    let evaluated = false;
    //let dispExpression = document.querySelector(".expression");
    nums.forEach((btn) => {
        btn.addEventListener("click", () => {
            const val = btn.textContent;
            // if last button was operator or equals clear the display
            if (dispValue.textContent != "" && (lastOperator == true || evaluated == true)) {
                dispValue.textContent = "";
                dispValue.textContent = val;
                evaluated = false;
            }
            // don't add any extra zeroes if a single zero is already present
            else if(dispValue.textContent != "0") {
                dispValue.textContent += val;
            }
            else {
                dispValue.textContent = val;
            }
            lastOperator = false;
        });
    });

    const clearBtn = document.querySelector(".btn.clear");
    clearBtn.addEventListener("click", () => {
        dispValue.textContent = "";
        firstNum = null;
        secondNum = null;
        operator = "";
        lastOperator = false;
        evaluated = false;
    });

    const equalsBtn = document.querySelector(".btn.equals");
    equalsBtn.addEventListener("click", () => {
        // only calculate if we have a number stored and the display isn't empty, otherwise leave as is
        if(firstNum != null && lastOperator == false){
            secondNum = parseFloat(dispValue.textContent);
            dispValue.textContent = operate(operator, firstNum, secondNum);
            firstNum = parseFloat(dispValue.textContent);
        }
        firstNum = null;
        secondNum = null;
        // set this so we know to overwrite display if any numbers are pressed after equals
        evaluated = true;
        operator = "";
    });

    const operations = document.querySelectorAll(".btn.op");
    operations.forEach(btn => {
        const op = btn.textContent;
        btn.addEventListener("click", () => {
            // only if we have no number stored and the display isn't empty
            if(firstNum === null && dispValue.textContent !== "") {
                //dispExpression.textContent = dispValue.textContent + op;
                firstNum = parseFloat(dispValue.textContent);
                operator = op;
                lastOperator = true;
            }
            // only if we have a number stored and our last button wasn't an operator
            else if(firstNum !== null && lastOperator == false) {
                secondNum = parseFloat(dispValue.textContent);
                dispValue.textContent = operate(operator, firstNum, secondNum);
                firstNum = parseFloat(dispValue.textContent);
                operator = op;
                lastOperator = true;
                //dispExpression.textContent = dispValue.textContent + op;
            }
            // if two operators in a row overwrite the previous operator
            else {
                operator = op;
                lastOperator = true;
            }
        });
    });
}

initializeButtons();