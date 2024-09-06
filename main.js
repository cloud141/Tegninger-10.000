const playersAdded = [];
const diceValues = [1, 2, 3, 4, 5, 6];
let diceOnHold = [false, false, false, false, false, false];
let heldDiceValues = [];
let totalDiceValueArray = [];
let gameStarted = false;
let currentScore = 0;
let playerScores = [];
let currentPlayer = 0; // Track the current player
const winningScore = 10000; // Winning score is 10,000 points

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
  console.log(totalDiceValueArray.concat());
  checkForPoints();
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
  playerScores = new Array(playersAdded.length).fill(0);
  currentPlayer = 0; // Reset to first player
  rerollAllDice();
  document.getElementById("startBtn").innerText = "Roll Again";
  document.getElementById("startBtn").onclick = rulTerning;
  updateScoreDisplay();
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
  checkForPoints();
}

function checkForPoints() {
  let currentRound = 0;
  let stringedValues = totalDiceValueArray.sort();
  let sortedValues = stringedValues.toString();

  // Scoring logic based on 10,000 rules
  if (sortedValues === "1,2,3,4,5,6") currentRound += 1000;
  else if (sortedValues === "1") currentRound += 100;
  else if (sortedValues === "5") currentRound += 50;
  else if (sortedValues === "1,1,1") currentRound += 1000;
  else if (sortedValues === "2,2,2") currentRound += 200;
  else if (sortedValues === "3,3,3") currentRound += 300;
  else if (sortedValues === "4,4,4") currentRound += 400;
  else if (sortedValues === "5,5,5") currentRound += 500;
  else if (sortedValues === "6,6,6") currentRound += 600;

  currentScore = currentRound;
  updateScoreDisplay();
}

function updateScoreDisplay() {
  document.getElementById("display").innerText =
    "Current player: " + playersAdded[currentPlayer] + "\n" +
    "Current score: " + currentScore + "\n" +
    "Total scores: " + playerScores.map((score, index) => `${playersAdded[index]}: ${score}`).join("\n");
}

function bankPoints() {
  playerScores[currentPlayer] += currentScore;
  currentScore = 0;

  if (playerScores[currentPlayer] >= winningScore) {
    alert(playersAdded[currentPlayer] + " has won with " + playerScores[currentPlayer] + " points!");
    resetGame();
    return;
  }

  nextPlayer();
}

function nextPlayer() {
  currentPlayer = (currentPlayer + 1) % playersAdded.length;
  resetDiceHold();
  updateScoreDisplay();
}

function resetGame() {
  gameStarted = false;
  playerScores = [];
  currentPlayer = 0;
  document.getElementById("startBtn").innerText = "Start Game";
  document.getElementById("display").innerText = "";
  rerollAllDice();
}

function addPlayers() {
  const player = document.getElementById("playerId").value.trim();
  if (player) {
    playersAdded.push(player);
    document.getElementById("display").innerText += player + "\n";
    document.getElementById("playerId").value = "";
  }
}

function deletePlayer() {
  const player = document.getElementById("playerId").value.trim();
  if (player) {
    const index = playersAdded.indexOf(player);
    if (index > -1) {
      playersAdded.splice(index, 1);
      document.getElementById("display").innerText = playersAdded.join("\n");
    }
    document.getElementById("playerId").value = "";
  }
}
