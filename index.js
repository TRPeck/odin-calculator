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
            if(b == 0) {
                disableButtons();
                return "Divide by zero? I can't do that Dave.";
            }
            else {
                return divide(a,b);
            }
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
        btn.addEventListener("click", (e) => {
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
        // prevent focus on button after click so enter (=) does not also trigger previously clicked button
        btn.addEventListener("mousedown", (e) => {
            e.preventDefault();
        });
        window.addEventListener("keydown", (e) => {
            if(e.key == btn.textContent) {
                btn.click();
            }
        });
    });

    const clearBtn = document.querySelector(".btn.clear");
    clearBtn.addEventListener("click", () => {
        enableButtons();
        dispValue.textContent = "";
        firstNum = null;
        secondNum = null;
        operator = "";
        lastOperator = false;
        evaluated = false;
    });
    clearBtn.addEventListener("mousedown", (e) => {
        e.preventDefault();
    });

    const equalsBtn = document.querySelector(".btn.equals");
    equalsBtn.addEventListener("click", () => {
        // only calculate if we have a number stored and the display isn't empty, otherwise leave as is
        if(firstNum != null && lastOperator == false){
            secondNum = parseFloat(dispValue.textContent);
            dispValue.textContent = parseFloat(operate(operator, firstNum, secondNum)).toFixed(7) * 1;
            firstNum = parseFloat(dispValue.textContent);
        }
        firstNum = null;
        secondNum = null;
        // set this so we know to overwrite display if any numbers are pressed after equals
        evaluated = true;
        operator = "";
    });
    equalsBtn.addEventListener("mousedown", (e) => {
        e.preventDefault();
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
                dispValue.textContent = parseFloat(operate(operator, firstNum, secondNum)).toFixed(7) * 1;
                firstNum = parseFloat(dispValue.textContent);
                operator = op;
                lastOperator = true;
                //dispExpression.textContent = dispValue.textContent + op;
            }
            // if two operators in a row overwrite the previous operator
            else if (operator != ""){
                operator = op;
                lastOperator = true;
            }
        });
        btn.addEventListener("mousedown", (e) => {
            e.preventDefault();
        });
        window.addEventListener("keydown", (e) => {
            if(e.key == btn.textContent) {
                btn.click();
            }
        });
    });

    const decimalBtn = document.querySelector(".btn.decimal");
    decimalBtn.addEventListener("click", () => {
        if(dispValue.textContent == "" || lastOperator == true || evaluated == true) {
            dispValue.textContent = "0.";
            lastOperator = false;
            evaluated = false;
        }
        else if(!dispValue.textContent.includes(".") && lastOperator != true) {
            dispValue.textContent += ".";
            lastOperator = false;
        }
    });
    decimalBtn.addEventListener("mousedown", (e) => {
        e.preventDefault();
    });

    const bkspBtn = document.querySelector(".btn.bksp");
    bkspBtn.addEventListener("click", () => {
        // if answer is scientific notation prevent backspace to avoid errors the the 'e' and '+'
        if(dispValue.textContent.includes("e")) {
            e.preventDefault();
            e.stopPropagation();
        }
        else if(dispValue.textContent != "") {
            dispValue.textContent = dispValue.textContent.substring(0, dispValue.textContent.length - 1);
        }
        if(lastOperator == true) {
            lastOperator = false;
            operator = "";
            firstNum = null;
        }
        evaluated = false;
    });
    bkspBtn.addEventListener("mousedown", (e) => {
        e.preventDefault();
    });

    window.addEventListener("keydown", (e) => {
        switch(e.key) {
            case ".":
                decimalBtn.click();
                break;
            case "Backspace":
                bkspBtn.click();
                break;
            case "Enter":
                equalsBtn.click();
                break;
            case "Delete":
                clearBtn.click();
                break;
        }
    });
}

function disableButtons() {
    const btns = document.querySelectorAll(".btn.op, .btn.num, .btn.equals, .btn.bksp");
    btns.forEach(btn => {
        btn.disabled = true;
    });
}

function enableButtons() {
    const btns = document.querySelectorAll(".btn.op, .btn.num, .btn.equals, .btn.bksp");
    btns.forEach(btn => {
        btn.disabled = false;
    });
}

initializeButtons();