let buttons = document.querySelectorAll("button")
let result = document.querySelector("#result-cont")
let equal = document.querySelector("#equal")
let Ac =document.querySelector("#AC")
let pm = document.querySelector("#plus-minus")

let numbersButtons = ["0","1","2","3","4","5","6","7","8","9"]
let AO = ["+", "-", "×", "÷", "%"]

let last_input = ""
let Number = ""
let equationArray = []
let dot = false
let minus = false

buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        let value = event.target.value
        if(AO.includes(value)) {
            if(value === "-" && minus === false && (result.innerHTML === "" || (equationArray[equationArray.length-1] === "×" || equationArray[equationArray.length-1] === "÷"))) {
                Number += "-"
                result.innerHTML += "-"
                minus = true
            }
            else if(last_input === "number"){
                equationArray.push(Number, value)
                result.innerHTML += value
                last_input = "AO"
                Number = ""
                minus = false
                dot = false
            }
        }
        else if(numbersButtons.includes(value)) {
            Number += value
            result.innerHTML += value
            last_input = "number"
        }
        else if(value === "." && result.innerHTML !== "") {
            if(last_input === "number" && !Number.includes(".") && dot === false) {
                result.innerHTML += "."
                Number += "."
                dot = true
                last_input = "dot"
            }
        }
        console.log(equationArray)
    })
})

equal.addEventListener("click", () => {
    if(last_input === "AO") return
    equationArray.push(Number)
    while(equationArray.length > 1) {
        if(equationArray.includes("×")) {
            prossesOperation(equationArray, "×", (a,b) => {
                return a * b
            })
        }else if(equationArray.includes("÷")) {
            prossesOperation(equationArray, "÷", (a,b) => {
                if(b === 0) {
                    alert("Error: Division by zero")
                    equationArray.length = 0
                    result.innerHTML = "error"
                    return 0
                }
                return a / b
            })
        }else if(equationArray.includes("+")) {
            prossesOperation(equationArray, "+", (a,b) => {
                return a + b
            })
        }else if(equationArray.includes("-")) {
            prossesOperation(equationArray, "-", (a,b) => {
                return a - b
            })
        }else if(equationArray.includes("%")) {
            prossesOperation(equationArray, "%", (a,b) => {
                return (a / 100) * b
            })
        }
    }
    let finalResult = equationArray[0]
    result.innerHTML = finalResult
    equationArray = []
    Number = finalResult.toString()
})

function prossesOperation(arr, operator, operation) {
    let index = arr.indexOf(operator)
    let result = operation(parseFloat(arr[index-1]),parseFloat(arr[index+1]))
    arr.splice(index-1, 3, result)
}

Ac.addEventListener("click", () => {
    if(result.innerHTML == "") return
    result.innerHTML = ""
    Number = ""
    last_input = ""
    equationArray = []
})

pm.addEventListener("click", () => {
    if(result.innerHTML === "") return  
    let r = parseFloat(result.innerHTML)
    Number = (r * -1).toString()
    result.innerHTML = r * -1 
})


