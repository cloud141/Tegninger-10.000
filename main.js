const playersAdded = [];
const diceValues = [1, 2, 3, 4, 5, 6];
let diceOnHold = [false, false, false, false, false, false];
let heldDiceValues = [];
let totalDiceValueArray = [];
let gameStarted = false; //state to handle if game is started or not
let currentPoints = 0;
let score = 0;

function TriggerOnOfHold(dice) {
  if (!gameStarted) {
    alert("You need to start the game first!");
    return;
  }

  let diceNumber = parseInt(dice.id.replace("dice", "")) - 1;

  if (diceOnHold[diceNumber]) {
    dice.style.opacity = "1";
    diceOnHold[diceNumber] = false;
    heldDiceValues[diceNumber] = null;

    // klik til og fra af terning
    let indexToRemove = totalDiceValueArray.indexOf(diceValues[diceNumber]);
    if (indexToRemove !== -1) {
      totalDiceValueArray.splice(indexToRemove, 1);
    }
  } else {
    dice.style.opacity = "0.2";
    diceOnHold[diceNumber] = true;
    heldDiceValues[diceNumber] = diceValues[diceNumber];
    totalDiceValueArray.push(diceValues[diceNumber]);
  }
  console.log(totalDiceValueArray.concat());
  checkForPoints();
  if (diceOnHold.every((held) => held)) {
    setTimeout(resetDiceHold, 1000);
  }
}

function resetDiceHold() {
  for (let i = 0; i < 6; i++) {
    diceOnHold[i] = false;
    document.getElementById("dice" + (i + 1)).style.opacity = "1";
  }
  rerollAllDice();
}

function startGame() {
  gameStarted = true;
  rerollAllDice();
  document.getElementById("startBtn").innerText = "Roll Again";
  document.getElementById("startBtn").onclick = rulTerning;
}



function rerollAllDice() {
  const imgs = [
    "imgs/dices1.png",
    "imgs/dices2.png",
    "imgs/dices3.png",
    "imgs/dices4.png",
    "imgs/dices5.png",
    "imgs/dices6.png",
  ];
  // console.table(heldDiceValues);
  // for (let i = 1; i <= 6; i++) {
  //   if (!diceOnHold[i - 1]) {
  //     const randomIndex = Math.floor(Math.random() * imgs.length);
  //     document.getElementById("dices" + i).src = imgs[randomIndex];
  //     diceValues[i - 1] = randomIndex + 1;
  //     heldDiceValues[i - 1] = diceValues[i - 1];
  //   }
  // }

  console.table(heldDiceValues);
  for (let i = 1; i <= 6; i++) {
    if (!diceOnHold[i - 1]) {
      const randomIndex = Math.floor(Math.random() * imgs.length);

      document.getElementById("dices" + i).src = imgs[randomIndex];
      diceValues[i - 1] = randomIndex + 1;
    } else {
      document.getElementById("dices" + i).src =
        "imgs/dices" + heldDiceValues[i - 1] + ".png";
    }
  }
    let currentRound = checkForPoints();
    totalDiceValueArray = [];
    currentPoints += currentRound;
    currentRound = 0;
    document.getElementById('roundScore').innerHTML = currentPoints;
    document.getElementById('currentPoints').innerHTML = currentRound;
}

function rulTerning() {
  // const randomIndex = Math.floor(Math.random() * imgs.length);
  // document.getElementById("dices" + i).src = imgs[randomIndex];
  console.table(heldDiceValues);
  rerollAllDice();
}

function endTurn() {
  if(currentPoints >= 1000) {
    score += currentPoints;
    document.getElementById('score').innerHTML = score;
    currentPoints = 0;
  }
  resetDiceHold();
}

function checkForPoints(){

  let currentRound = 0;
  let chosenOnes = totalDiceValueArray.filter(function(dice) {
    return dice === 1;
  }).length;

  let chosenTwos = totalDiceValueArray.filter(function(dice) {
    return dice === 2;
  }).length;

  let chosenThrees = totalDiceValueArray.filter(function(dice) {
    return dice === 3;
  }).length;

  let chosenFours = totalDiceValueArray.filter(function(dice) {
    return dice === 4;
  }).length;

  let chosenFives = totalDiceValueArray.filter(function(dice) {
    return dice === 5;
  }).length;

  let chosenSix = totalDiceValueArray.filter(function(dice) {
    return dice === 6;
  }).length;

  
  
  switch (chosenOnes) {
  case 1:
    currentRound += 100;
    break;
    case 2:
      currentRound += 200;
      break;
  case 3:
    currentRound += 1000;
    break;
  case 4:
    currentRound += 2000;
    break;
    case 5:
      currentRound += 4000;
      break;
      case 6:
      currentRound += 10000;
      break;
}

switch (chosenTwos) {
  case 3:
    currentRound += 200;
    break;
  case 4:
    currentRound += 400;
    break;
  case 5:
    currentRound += 800;
    break;
  case 6:
    currentRound += 1600;
    break;
}

switch (chosenThrees) {
  case 3:
    currentRound += 300;
    break;
  case 4:
    currentRound += 600;
    break;
  case 5:
    currentRound += 1200;
    break;
  case 6:
    currentRound += 2400;
    break;
}

switch (chosenFours) {
  case 3:
    currentRound += 400;
    break;
  case 4:
    currentRound += 800;
    break;
  case 5:
    currentRound += 1600;
    break;
  case 6:
    currentRound += 3200;
    break;
}

switch (chosenFives) {
  case 1:
    currentRound += 50;
    break;
  case 2:
    currentRound += 100;
    break;
  case 3:
    currentRound += 500;
    break;
  case 4:
    currentRound += 1000;
    break;
  case 5:
    currentRound += 2000;
    break;
  case 6:
    currentRound += 4000;
    break;
}

switch (chosenSix) {
  case 3:
    currentRound += 600;
    break;
  case 4:
    currentRound += 1200;
    break;
  case 5:
    currentRound += 2400;
    break;
  case 6:
    currentRound += 4800;
    break;
}


console.log(currentRound);
document.getElementById('currentPoints').innerHTML = currentRound;
return currentRound

}

// function checkForPoints() {
//   let currentRound = 0;
//   let stringedValues = totalDiceValueArray.sort();
//   let sortedValues = stringedValues.toString();
//   if (sortedValues === "1,2,3,4,5,6") currentRound += 1000;
//   else if (sortedValues === "1") currentRound += 100;
//   else if (sortedValues === "1,1") currentRound += 200;
//   else if (sortedValues === "1,1,1") currentRound += 1000;
//   else if (sortedValues === "1,1,1,1") currentRound += 2000;
//   else if (sortedValues === "1,1,1,1,1") currentRound += 4000;
//   else if (sortedValues === "1,1,1,1,1,1") currentRound += 10000;
//   else if (sortedValues === "5") currentRound += 50;
//   else if (sortedValues === "5,5") currentRound += 100;


//   console.log(currentRound);
// }

function addPlayers() {
  const players = document.getElementById("playerId").value.trim();
  playersAdded.push(players);
  document.getElementById("display").innerText += players + "\n";
  document.getElementById("playerId").value = "";
}

function deletePlayer() {
  const players = document.getElementById("playerId").value.trim();

  if (players !== "") {
    const index = playersAdded.indexOf(players);

    if (index > -1) {
      playersAdded.splice(index, 1);
      document.getElementById("display").innerText = playersAdded.join("\n");
    }

    document.getElementById("playerId").value = "";
  }
}
