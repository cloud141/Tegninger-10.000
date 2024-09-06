const playersAdded = [];
let currentPlayerIndex = 0;

let diceOnHold = [false, false, false, false, false, false];
<<<<<<< Updated upstream
=======
let heldDiceValues = [];
let totalDiceValueArray = [];
let gameStarted = false;
let currentScore = 0;
let currentPlayerIndex = 0;
>>>>>>> Stashed changes

function TriggerOnOfHold(dice) {
  let diceNumber = parseInt(dice.id.replace("dice", "")) - 1;

  if (diceOnHold[diceNumber]) {
    dice.style.opacity = "1";
    diceOnHold[diceNumber] = false;
<<<<<<< Updated upstream
  } else {
    dice.style.opacity = "0.2";
    diceOnHold[diceNumber] = true;
=======
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
>>>>>>> Stashed changes
  }
}

// Funktion til at generere unikt ID
function generateUniqueId() {
  return 'player-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}

// Funktion til at tilføje en spiller med et unikt ID og score
function addPlayers() {
  const playerName = document.getElementById("playerId").value.trim();
  if (playerName) {
    const newPlayer = {
      id: generateUniqueId(),
      name: playerName,
      score: 0,
    };
    playersAdded.push(newPlayer);
    document.getElementById("display").innerText += newPlayer.name + "\n";
    document.getElementById("playerId").value = "";
    
    // Opdater nuværende spiller, hvis det er den første spiller
    if (playersAdded.length === 1) {
      displayCurrentPlayer();
    }
  }
}

// Funktion til at slette en spiller
function deletePlayer() {
  const playerName = document.getElementById("playerId").value.trim();

  if (playerName !== "") {
    const index = playersAdded.findIndex(player => player.name === playerName);

    if (index > -1) {
      playersAdded.splice(index, 1);
      document.getElementById("display").innerText = playersAdded.map(player => player.name).join("\n");

      // Hvis den slettede spiller var den nuværende spiller, skift til den næste spiller
      if (index === currentPlayerIndex) {
        currentPlayerIndex = currentPlayerIndex % playersAdded.length;
        displayCurrentPlayer();
      }
    }

    document.getElementById("playerId").value = "";
  }
}

// Funktion til at rulle terningerne
function rulTerning() {
  const imgs = [
    "imgs/dices1.png",
    "imgs/dices2.png",
    "imgs/dices3.png",
    "imgs/dices4.png",
    "imgs/dices5.png",
    "imgs/dices6.png",
  ];

  for (let i = 1; i <= 6; i++) {
<<<<<<< Updated upstream
    const randomIndex = Math.floor(Math.random() * imgs.length);

    document.getElementById("dices" + i).src = imgs[randomIndex];
  }
}

// Funktion til at vise den nuværende spiller
function displayCurrentPlayer() {
  const currentPlayer = playersAdded[currentPlayerIndex];
  document.getElementById("currentPlayerDisplay").innerText = `Nuværende spiller: ${currentPlayer.name}`;
}

// Funktion til at tilføje score til den nuværende spiller
function addScore() {
  const diceScore = parseInt(document.getElementById("score").innerText, 10) || 0;
  const currentPlayer = playersAdded[currentPlayerIndex];

  if (diceScore + currentPlayer.score < 1000) {
    currentPlayer.score += diceScore;
  } else {
    currentPlayer.score = 1000; // eller en anden maks. værdi
=======
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
  let diceCount = {};  // Object to keep track of how many times each dice value appears

  // Count occurrences of each dice value
  heldDiceValues.forEach((value) => {
    if (value) {
      diceCount[value] = (diceCount[value] || 0) + 1;
    }
  });

  // Check for three 1's
  if (diceCount[1] >= 3) {
    currentRound += 1000;
    diceCount[1] -= 3; // Remove the three 1's that gave 1000 points
  }

  // Give points for remaining 1's (if there are any left)
  if (diceCount[1]) {
    currentRound += diceCount[1] * 100;
  }

  // Check for three of other numbers (except 1's)
  for (let i = 2; i <= 6; i++) {
    if (diceCount[i] >= 3) {
      currentRound += i * 100;  // Three of any other number gives the number * 100 points
    }
  }

  console.log("Points for this round: " + currentRound);
  currentScore += currentRound;
}

function addPlayers() {
  const playerName = document.getElementById("playerId").value.trim();
  if (playerName) {
    const newPlayer = {
      name: playerName,
      score: 0,
    };
    playersAdded.push(newPlayer);
    document.getElementById("display").innerText += newPlayer.name + "\n";
    document.getElementById("playerId").value = "";

    if (playersAdded.length === 1) {
      displayCurrentPlayer();
    }
  }
}

function deletePlayer() {
  const playerName = document.getElementById("playerId").value.trim();

  if (playerName !== "") {
    const index = playersAdded.findIndex(player => player.name === playerName);

    if (index > -1) {
      playersAdded.splice(index, 1);
      document.getElementById("display").innerText = playersAdded.map(player => player.name).join("\n");

      if (index === currentPlayerIndex) {
        currentPlayerIndex = currentPlayerIndex % playersAdded.length;
        displayCurrentPlayer();
      }
    }

    document.getElementById("playerId").value = "";
>>>>>>> Stashed changes
  }

  // Reset terningernes hold og score
  diceOnHold = [false, false, false, false, false, false];
  document.getElementById("score").innerText = "0";

  // Skift til næste spiller
  nextPlayer();
}

// Funktion til at skifte til næste spiller
function nextPlayer() {
  currentPlayerIndex = (currentPlayerIndex + 1) % playersAdded.length;
  displayCurrentPlayer();
}

// Event listener for at tilføje score ved klik
document.getElementById("addScoreButton").addEventListener("click", addScore);

// Initial display, hvis spillere allerede er tilføjet
if (playersAdded.length > 0) {
  displayCurrentPlayer();
}

function displayCurrentPlayer() {
  const currentPlayer = playersAdded[currentPlayerIndex];
  document.getElementById("currentPlayerDisplay").innerText = `Nuværende spiller: ${currentPlayer.name}`;
}

function addScore() {
  const diceScore = parseInt(document.getElementById("score").innerText, 10) || 0;
  const currentPlayer = playersAdded[currentPlayerIndex];

  if (diceScore + currentPlayer.score < 1000) {
    currentPlayer.score += diceScore;
  } else {
    currentPlayer.score = 1000;
  }

  diceOnHold = [false, false, false, false, false, false];
  document.getElementById("score").innerText = "0";

  nextPlayer();
}

function nextPlayer() {
  currentPlayerIndex = (currentPlayerIndex + 1) % playersAdded.length;
  displayCurrentPlayer();
}

document.getElementById("addScoreButton").addEventListener("click", addScore);

if (playersAdded.length > 0) {
  displayCurrentPlayer();
}
