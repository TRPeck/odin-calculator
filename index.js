let firstNum = 0;
let secondNum = 0;
let operator = "";

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
    const nums = document.querySelectorAll(".btn.num");
    let dispValue = document.querySelector(".answer");
    nums.forEach((btn) => {
        btn.addEventListener("click", () => {
            const val = btn.textContent;
            if(dispValue.textContent != "0") {
                dispValue.textContent += val;
            }
            else {
                dispValue.textContent = val;
            }
        });
    });
}

initializeButtons();