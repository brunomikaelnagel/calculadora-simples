const display = document.getElementById("calc_display") as HTMLElement
const operationButtons = document.getElementsByName("operator")
const numberButtons = document.getElementsByName("number")
const backspaceButton = document.getElementById("backspace")
const percentButton = document.getElementById("percent")
const clearButton = document.getElementById("clear")
const pointButton = document.getElementById("point")
const equalButton = document.getElementById("equal")
const plusMinus = document.getElementById("plusMinus")

class Calculator {
    private display: HTMLElement
    private anotherValue: string = ""
    private operation: string = ""
    private restart: boolean = false

    constructor(display: HTMLElement){
        this.display = display
    }

    errorDisplay(){
        this.restart = true
        this.anotherValue = ""
        return "Error"
    }

    addDigit(digit: string){
        if(this.restart){
            this.display.textContent = digit
            this.restart = false
        }else{
            this.display.textContent += digit
        }
    }

    clearCalc(){
        this.display.textContent = ""
        this.anotherValue = ""
        this.operation = ""
    }

    set setOperation(operator: string){
        if(!this.operation){
            this.operation = operator
            this.anotherValue = this.display.textContent??""
            this.restart = true
        }
    }

    displayBackspace(){
        const displayValue = this.display.textContent
        if(displayValue){
            this.display.textContent = displayValue.substring(0, displayValue.length - 1)
        }
    }

    numberPercent(){
        const displayValue = this.display.textContent
        if(displayValue){
            this.display.textContent = String(parseFloat(displayValue) / 100)
        }
    }

    addPoint(){
        const displayValue = this.display.textContent
        if(displayValue && !displayValue.includes(".")){
            this.display.textContent += "."
        }
    }

    plusMinus(){
        const displayValue = this.display.textContent
        if(displayValue){
            this.display.textContent = String(parseFloat(displayValue) * -1)
        }
    }

    equalOperation(){
        if(this.operation && this.display.textContent){
            const n1 = parseFloat(this.anotherValue)
            const n2 = parseFloat(this.display.textContent)
            
            let resultado: string

            switch(this.operation){
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
                    resultado = this.errorDisplay()
            } 
            
            if(resultado.length <= 15){
                this.display.textContent = resultado
            }else{
                const formatter = Intl.NumberFormat("en-US", {notation: "engineering"})
                this.display.textContent = formatter.format(parseFloat(resultado))
            }

            this.display.textContent = resultado
            this.anotherValue = ""
            this.operation = ""
        }
    }
}

const calc = new Calculator(display)

numberButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = (e.target as HTMLButtonElement).textContent??""
        calc.addDigit(value)
    })
})

operationButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = (e.target as HTMLButtonElement).textContent??""
        calc.setOperation = value
    })
})

backspaceButton?.addEventListener("click", () => {
    calc.displayBackspace()
})

percentButton?.addEventListener("click", () => {
    calc.numberPercent()
})

clearButton?.addEventListener("click", () => {
    calc.clearCalc()
})

pointButton?.addEventListener("click", () => {
    calc.addPoint()
})

plusMinus?.addEventListener("click", () => {
    calc.plusMinus()
})

equalButton?.addEventListener("click", () => {
    calc.equalOperation()
})
