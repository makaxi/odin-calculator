function add(a,b){
  return a + b;
}

function subtract(a,b){
  return a - b;
}

function multiply(a,b){
  return a * b;
}

function divide(a,b){
  if(b === 0) return "invalid";
  return a / b;
}

function operate(firstNum, secondNum, operator){
  firstNum = Number(firstNum);
  secondNum = Number(secondNum);
  switch(operator){
    case "+" :
      return add(firstNum, secondNum);
    case "-" :
      return subtract(firstNum, secondNum);
    case "*" :
      return multiply(firstNum, secondNum);
    case "/" :
      return divide(firstNum, secondNum);    
  }
}

let firstNumber;
let secondNumber;
let pressedOperator;
let savedAnswer;

const calcDisplay = document.querySelector('.display');

const numBtnListener = document.querySelectorAll('.numbers');
numBtnListener.forEach(numButton => {
  numButton.addEventListener('click', () => {
    if(firstNumber && pressedOperator){
      if(!secondNumber) secondNumber = numButton.textContent;
      else secondNumber += numButton.textContent;
      calcDisplay.innerHTML = "2nd num: " + secondNumber;
    }
    else{
      if(!firstNumber) firstNumber = numButton.textContent;
      else firstNumber += numButton.textContent;
      calcDisplay.innerHTML = "1st num: " + firstNumber;
    }
    displayCurValue();
  })
})

const operatorListener = document.querySelectorAll('.operators');
operatorListener.forEach(operatorButton => {
  operatorButton.addEventListener('click', () => {

    console.log("pre operator values: ");
    displayCurValue();

    if(firstNumber && secondNumber && pressedOperator){
      calculate();
    }
    if(!firstNumber) {
      firstNumber = savedAnswer;
      savedAnswer = undefined;
    }
    pressedOperator = operatorButton.textContent;
    
    console.log("post operator clicked values: ");
    displayCurValue();
  })
})

const equalsListener = document.querySelector('.equals');
equalsListener.addEventListener('click', () => {
  calculate();
})

const clearListener = document.querySelector('.clear');
clearListener.addEventListener('click', () => {
  clearOutValues();
  savedAnswer = undefined;
  calcDisplay.innerHTML = "";
  displayCurValue();
})

const deleteCharListener = document.querySelector('.delete');
deleteCharListener.addEventListener('click', () => {
  if(secondNumber) {
    secondNumber = secondNumber.slice(0,-1);
    calcDisplay.innerHTML = "2nd num: " + secondNumber;
  }
  else if(!pressedOperator){
    firstNumber = firstNumber.slice(0, -1);
    calcDisplay.innerHTML = "1st num: " + firstNumber;
  }
  displayCurValue();
})

function calculate(){
  displayCurValue();
  let ans = operate(firstNumber, secondNumber, pressedOperator);
  calcDisplay.innerHTML = "ans: " + ans;
  console.log("ans = " + ans);
  savedAnswer = ans;
  clearOutValues();
}

function displayCurValue(){
  console.log(
  "1st num: " + firstNumber +
  "\n2nd num: " + secondNumber +
  "\noperator: " + pressedOperator +
  "\nsaved value: " + savedAnswer
  )
}

function clearOutValues(){
  firstNumber = undefined;
  secondNumber = undefined;
  pressedOperator = undefined;
}

/*  
TODO
Extra credit:
- make decimal point work
- add CSS to calculator
- keyboard support?
*/