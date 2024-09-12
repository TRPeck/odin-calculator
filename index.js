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
    //let dispExpression = document.querySelector(".expression");
    nums.forEach((btn) => {
        btn.addEventListener("click", () => {
            const val = btn.textContent;
            if (dispValue.textContent != "" && lastOperator == true) {
                dispValue.textContent = "";
                dispValue.textContent = val;
            }
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
    });

    const equalsBtn = document.querySelector(".btn.equals");
    equalsBtn.addEventListener("click", () => {
        if(lastOperator == true) {
            dispValue.textContent = firstNum;
        }
        else {
            secondNum = parseFloat(dispValue.textContent);
            dispValue.textContent = operate(operator, firstNum, secondNum);
            firstNum = parseFloat(dispValue.textContent);
        }
        firstNum = null;
        secondNum = null;
        lastOperator = false;
        operator = "";
    });

    const operations = document.querySelectorAll(".btn.op");
    operations.forEach(btn => {
        const op = btn.textContent;
        btn.addEventListener("click", () => {
            if(firstNum === null && dispValue.textContent !== "") {
                //dispExpression.textContent = dispValue.textContent + op;
                firstNum = parseFloat(dispValue.textContent);
                operator = op;
                lastOperator = true;
            }
            else if(firstNum !== null) {
                secondNum = parseFloat(dispValue.textContent);
                dispValue.textContent = operate(operator, firstNum, secondNum);
                firstNum = parseFloat(dispValue.textContent);
                operator = op;
                lastOperator = true;
                //dispExpression.textContent = dispValue.textContent + op;
            }
        });
    });
}

initializeButtons();