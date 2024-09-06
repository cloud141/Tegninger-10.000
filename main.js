const playersAdded = [];
const playerScores = {}; // Object to store scores for each player
const diceValues = [1, 2, 3, 4, 5, 6];
let diceOnHold = [false, false, false, false, false, false];
let heldDiceValues = [];
let totalDiceValueArray = [];
let gameStarted = false; // state to handle if game is started or not
let currentScore = 0;
let currentPlayerIndex = 0; // Keep track of which player's turn it is

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
}

function rulTerning() {
  rerollAllDice();
}

function checkForPoints() {
  let currentRound = 0;
  let stringedValues = totalDiceValueArray.sort();
  let sortedValues = stringedValues.toString();
  
  // Your point-checking logic (e.g. matching combinations)
  // (Same as before)
  
  console.log(currentRound);
  
  // Update the current player's score
  const currentPlayer = playersAdded[currentPlayerIndex];
  playerScores[currentPlayer] += currentRound;
  
  // Display the updated score
  document.getElementById("scoreDisplay").innerText = 
    playersAdded.map(player => `${player}: ${playerScores[player]} points`).join("\n");

  // Check if current player has reached the winning score
  if (playerScores[currentPlayer] >= 10000) {
    alert(`${currentPlayer} wins with ${playerScores[currentPlayer]} points!`);
    resetGame();
  } else {
    // Move to the next player's turn
    currentPlayerIndex = (currentPlayerIndex + 1) % playersAdded.length;
    alert(`Next player's turn: ${playersAdded[currentPlayerIndex]}`);
  }
}

function addPlayers() {
  const players = document.getElementById("playerId").value.trim();
  playersAdded.push(players);
  playerScores[players] = 0; // Initialize player score to 0
  document.getElementById("display").innerText += players + "\n";
  document.getElementById("playerId").value = "";
}

function deletePlayer() {
  const players = document.getElementById("playerId").value.trim();
  const index = playersAdded.indexOf(players);
  if (index > -1) {
    playersAdded.splice(index, 1);
    delete playerScores[players]; // Remove player from scores
    document.getElementById("display").innerText = playersAdded.join("\n");
  }
  document.getElementById("playerId").value = "";
}

function resetGame() {
  gameStarted = false;
  currentPlayerIndex = 0;
  for (let player in playerScores) {
    playerScores[player] = 0;
  }
  document.getElementById("startBtn").innerText = "Start Game";
  document.getElementById("scoreDisplay").innerText = "";
  rerollAllDice();
}
