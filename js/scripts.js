"use strict";
const display = document.getElementById("calc_display");
const operationButtons = document.getElementsByName("operator");
const numberButtons = document.getElementsByName("number");
const backspaceButton = document.getElementById("backspace");
const percentButton = document.getElementById("percent");
const clearButton = document.getElementById("clear");
const pointButton = document.getElementById("point");
const equalButton = document.getElementById("equal");
const plusMinus = document.getElementById("plusMinus");
class Calculator {
    constructor(display) {
        this.anotherValue = "";
        this.operation = "";
        this.restart = false;
        this.display = display;
    }
    errorDisplay() {
        this.restart = true;
        this.anotherValue = "";
        return "Error";
    }
    addDigit(digit) {
        if (this.restart) {
            this.display.textContent = digit;
            this.restart = false;
        }
        else {
            this.display.textContent += digit;
        }
    }
    clearCalc() {
        this.display.textContent = "";
        this.anotherValue = "";
        this.operation = "";
    }
    set setOperation(operator) {
        var _a;
        if (!this.operation) {
            this.operation = operator;
            this.anotherValue = (_a = this.display.textContent) !== null && _a !== void 0 ? _a : "";
            this.restart = true;
        }
    }
    displayBackspace() {
        const displayValue = this.display.textContent;
        if (displayValue) {
            this.display.textContent = displayValue.substring(0, displayValue.length - 1);
        }
    }
    numberPercent() {
        const displayValue = this.display.textContent;
        if (displayValue) {
            this.display.textContent = String(parseFloat(displayValue) / 100);
        }
    }
    addPoint() {
        const displayValue = this.display.textContent;
        if (displayValue && !displayValue.includes(".")) {
            this.display.textContent += ".";
        }
    }
    plusMinus() {
        const displayValue = this.display.textContent;
        if (displayValue) {
            this.display.textContent = String(parseFloat(displayValue) * -1);
        }
    }
    equalOperation() {
        if (this.operation && this.display.textContent) {
            const n1 = parseFloat(this.anotherValue);
            const n2 = parseFloat(this.display.textContent);
            let resultado;
            switch (this.operation) {
                case "+":
                    resultado = String(n1 + n2);
                    break;
                case "-":
                    resultado = String(n1 - n2);
                    break;
                case "/":
                    resultado = n2 !== 0 ? String(n1 / n2) : this.errorDisplay();
                    break;
                case "*":
                    resultado = String(n1 * n2);
                    break;
                default:
                    resultado = this.errorDisplay();
            }
            if (resultado.length <= 15) {
                this.display.textContent = resultado;
            }
            else {
                const formatter = Intl.NumberFormat("en-US", { notation: "engineering" });
                this.display.textContent = formatter.format(parseFloat(resultado));
            }
            this.display.textContent = resultado;
            this.anotherValue = "";
            this.operation = "";
        }
    }
}
const calc = new Calculator(display);
numberButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        var _a;
        const value = (_a = e.target.textContent) !== null && _a !== void 0 ? _a : "";
        calc.addDigit(value);
    });
});
operationButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        var _a;
        const value = (_a = e.target.textContent) !== null && _a !== void 0 ? _a : "";
        calc.setOperation = value;
    });
});
backspaceButton === null || backspaceButton === void 0 ? void 0 : backspaceButton.addEventListener("click", () => {
    calc.displayBackspace();
});
percentButton === null || percentButton === void 0 ? void 0 : percentButton.addEventListener("click", () => {
    calc.numberPercent();
});
clearButton === null || clearButton === void 0 ? void 0 : clearButton.addEventListener("click", () => {
    calc.clearCalc();
});
pointButton === null || pointButton === void 0 ? void 0 : pointButton.addEventListener("click", () => {
    calc.addPoint();
});
plusMinus === null || plusMinus === void 0 ? void 0 : plusMinus.addEventListener("click", () => {
    calc.plusMinus();
});
equalButton === null || equalButton === void 0 ? void 0 : equalButton.addEventListener("click", () => {
    calc.equalOperation();
});
