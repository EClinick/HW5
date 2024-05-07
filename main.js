let goal, wins = 0, loses = 0, numbers=[], workArea = "", calc="";

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

function setNumbers(numbers){
    let total = numbers.length;
    for(let i = 1; i <= total; i++){
        document.getElementById("btn" + i).innerText = numbers[i - 1];
    }
}

function Number(btn){
    workArea += document.getElementById(btn).innerText;
    document.getElementById("workArea").innerText = workArea;
    document.getElementById(btn).disabled = true; // disable the button after it's clicked
}

function Addition(){
    workArea += "+";
    document.getElementById("workArea").innerText = workArea;
}

function Subtraction(){
    workArea += "-";
    document.getElementById("workArea").innerText = workArea;
}

function Equals(){
    if (workArea.includes("+")) {
        chooseNumber("+");
    } else if (workArea.includes("-")) {
        chooseNumber("-");
    } else if (workArea.includes("*")) {
        chooseNumber("*");
    }

}

function Multiplication(){
    workArea += "*";
    document.getElementById("workArea").innerText = workArea;
}

function Remove(){
    if(workArea.length > 0) {
        workArea = workArea.substring(0, workArea.length - 1);
    }
    document.getElementById("workArea").innerText = workArea;
}

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
