let goal, wins = 0, loses = 0, numbers=[], workArea = "", calc="";
/*
Name: Ethan Clinick, Jordan Cowan, Kai 
Date: 10/14/2021
Description: This is a math game where the user is given a goal number and a set of numbers. The user must use the set of numbers to reach the goal number. The user can use addition, subtraction, and multiplication to reach the goal number. The user can also remove numbers from the work area if they make a mistake. The user can also start a new game at any time. The user can also see their wins and loses.
Preconditions: The user must have a browser that supports HTML, CSS, and JavaScript.
Postconditions: The user will have a fun time playing a math game.
*/

/*
* Function: newGame
* Description: This function will start a new game. It will generate a new goal number and a new set of numbers. It will also reset the work area and the calc area.
* Parameters: None
* Returns: None
*/

function newGame() {
    const amount = 4;
    goal = Math.floor(Math.random() * 1000) + 1;
    workArea = "";
    document.getElementById("goal").innerText = goal;
    for(let i = 0; i < amount; i++){
        numbers[i] = Math.floor(Math.random() * 10) + 1;
    }
    document.getElementById("numbers").innerText = numbers.join(", ");
    setNumbers(numbers);
    document.getElementById("workArea").innerText = workArea;

    // Remove all the li from calc
    var calc = document.getElementById("calc");
    while (calc.hasChildNodes()) {
        calc.removeChild(calc.firstChild);
    }

    // Reset all buttons
    if(wins !== 0 || loses !== 0){
        for(let i = 1; i <= amount; i++){
            let btn = document.getElementById("btn" + i);
            btn.style.display = 'inline'; // make the button visible
            btn.innerText = ''; // clear the button text
            btn.disabled = false; // enable the button
        }
        setNumbers(numbers);
    }
}
/*
* Function: setNumbers
* Description: This function will set the numbers on the buttons.
* Parameters: numbers
* Returns: None
*/
function setNumbers(numbers){
    let total = numbers.length;
    for(let i = 1; i <= total; i++){
        document.getElementById("btn" + i).innerText = numbers[i - 1];
    }
}
/*
* Function: Number
* Description: This function will add the number to the work area.
* Parameters: btn
* Returns: None
*/
function Number(btn){
    workArea += document.getElementById(btn).innerText;
    document.getElementById("workArea").innerText = workArea;
    document.getElementById(btn).disabled = true; // disable the button after it's clicked
}
/*
* Function: Addition
* Description: This function will add the addition operator to the work area.
* Parameters: None
* Returns: None
*/
function Addition(){
    workArea += "+";
    document.getElementById("workArea").innerText = workArea;
}
/*
* Function: Subtraction
* Description: This function will add the subtraction operator to the work area.
* Parameters: None
* Returns: None
*/

function Subtraction(){
    workArea += "-";
    document.getElementById("workArea").innerText = workArea;
}
/*
* Function: Equals
* Description: This function will check if the work area includes an operator. If it does, it will call the chooseNumber function.
* Parameters: None
* Returns: None
*/

function Equals(){
    if (workArea.includes("+")) {
        chooseNumber("+");
    } else if (workArea.includes("-")) {
        chooseNumber("-");
    } else if (workArea.includes("*")) {
        chooseNumber("*");
    }

}
/*
* Function: Multiplication
* Description: This function will add the multiplication operator to the work area.
* Parameters: None
* Returns: None
*/

function Multiplication(){
    workArea += "*";
    document.getElementById("workArea").innerText = workArea;
}
/*
* Function: Remove
* Description: This function will remove the last number from the work area.
* Parameters: None
* Returns: None
*/

function Remove(){
    if(workArea.length > 0) {
        workArea = workArea.substring(0, workArea.length - 1);
    }
    document.getElementById("workArea").innerText = workArea;
}

/*
* Function: chooseNumber
* Description: This function will choose the number based on the operator.
* Parameters: operator
* Returns: None
*/

function chooseNumber(operator) {
    let result;
    let parts = workArea.split(operator);
    let left = parseInt(parts[0]);
    let right = parseInt(parts[1]);

    calc = `${left} ${operator} ${right}`;

    switch(operator) {
        case '+':
            result = left + right;
            break;
        case '-':
            result = left - right;
            break;
        case '*':
            result = left * right;
            break;
    }

    // Check for NaN and halt updates if result is not a number
    if(isNaN(result)) {
        workArea = "";
        document.getElementById("workArea").innerText = workArea;
        return; // Exit function to prevent further updates
    }

    // Continue with operations as usual
    workArea = result.toString();
    updateNumbers(left, right, result);
    displayResult(result, operator);
}

/*
* Function: updateNumbers
* Description: This function will update the numbers array.
* Parameters: left, right, result
* Returns: None
*/
function updateNumbers(left, right, result) {
    let firstNumberIndex = numbers.indexOf(left);
    if (firstNumberIndex !== -1) {
        numbers.splice(firstNumberIndex, 1);
        document.getElementById(`btn${firstNumberIndex+1}`).disabled = false; 
    }

    let secondNumberIndex = numbers.indexOf(right);
    if (secondNumberIndex !== -1) {
        numbers.splice(secondNumberIndex, 1);
        document.getElementById(`btn${secondNumberIndex+1}`).disabled = false; 
    }

    numbers.push(result);

    for(let i = 0; i < numbers.length; i++){
        document.getElementById(`btn${i+1}`).innerText = numbers[i];
    }
    document.getElementById(`btn${numbers.length+1}`).innerText = '';
    document.getElementById(`btn${numbers.length+1}`).style.display = 'none';
    document.getElementById("numbers").innerText = numbers.join(", ");
    document.getElementById("workArea").innerText= '';
}
/*
* Function: displayResult
* Description: This function will display the result of the calculation.
* Parameters: result, operator
* Returns: None
*/

function displayResult(result, operator) {
    var li = document.createElement("li");
    li.innerText = calc + " = " + result;
    document.getElementById("calc").appendChild(li);

    if (result === goal) {
        wins++;
        document.getElementById("wins").innerText = wins;
        document.getElementById("wins").animate([{opacity: 0}, {opacity: 1}], {duration: 1000, iterations: 1});
        newGame();
    } else if (numbers.length === 1 && result !== goal) {
        loses++;
        document.getElementById("loses").innerText = loses;
        document.getElementById("loses").animate([{opacity: 0}, {opacity: 1}], {duration: 1000, iterations: 1});
        newGame();
    }
    workArea = "";
}

newGame();
