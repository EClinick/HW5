let goal, wins = 0, loses = 0, numbers=[], workArea = "";

function newGame() {
    const amount = 4;
    goal = Math.floor(Math.random() * 10) + 1;
    workArea = "";
    document.getElementById("goal").innerText = goal;
    for(let i = 0; i < amount; i++){
        numbers[i] = Math.floor(Math.random() * 10) + 1;
    }
    document.getElementById("numbers").innerText = numbers.join(", ");
    setNumbers(numbers);
    document.getElementById("workArea").innerText = workArea;

    // Reset all buttons
    if(wins!==0 || loses!==0){

        for(let i = 1; i <= amount; i++){
            let btn = document.getElementById("btn" + i);
            btn.style.display = 'inline'; // make the button visible
            btn.innerText = ''; // clear the button text
        }
        setNumbers(numbers);
    }
}
function setNumbers(numbers){
    total=numbers.length;
    
    for(let i = 1; i <= total; i++){
        document.getElementById("btn" + i).innerText = numbers[i - 1];
        
    }
}


function Number(btn){
    workArea += document.getElementById(btn).innerText;
    document.getElementById("workArea").innerText = workArea;
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
        chooseNumber(0, "+");
    } else if (workArea.includes("-")) {
        chooseNumber(0, "-");

    } else if (workArea.includes("*")) {
        chooseNumber(0, "*");
    }

}

function Multiplication(){
    workArea += "*";
    document.getElementById("workArea").innerText = workArea;
}
function Remove(){
    if(workArea.length > 0) {
        workArea = workArea.substring(0, workArea.length - 1); // removes the last character from a string
    }
    document.getElementById("workArea").innerText = workArea;
}
function chooseNumber(index, operator) {
    let result;
    let parts = workArea.split(operator);
    let left = parseInt(parts[0]);
    let right = parseInt(parts[1]);

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

    workArea = result.toString();
    let firstNumberIndex = numbers.indexOf(left); // find the index of the first number
    if (firstNumberIndex !== -1) {
        numbers.splice(firstNumberIndex, 1); // remove the first number
        
    }

    let secondNumberIndex = numbers.indexOf(right); // find the index of the second number
    if (secondNumberIndex !== -1) {
        numbers.splice(secondNumberIndex, 1); // remove the second number
    }

    numbers.push(result); // add the result to the numbers array

    // update the buttons
    for(let i = 0; i < numbers.length; i++){
        document.getElementById(`btn${i+1}`).innerText = numbers[i];
    }
    document.getElementById(`btn${numbers.length+1}`).innerText = '';
    document.getElementById(`btn${numbers.length+1}`).style.display = 'none';
    document.getElementById("numbers").innerText = numbers.join(", ");
    document.getElementById("workArea").innerText= '';
    
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
    workArea="";
}

newGame();