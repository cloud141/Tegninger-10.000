const playersAdded = [];
let currentPlayerIndex = 0;

let diceOnHold = [false, false, false, false, false, false];

function TriggerOnOfHold(dice) {
  let diceNumber = parseInt(dice.id.replace("dice", "")) - 1;

  if (diceOnHold[diceNumber]) {
    dice.style.opacity = "1";
    diceOnHold[diceNumber] = false;
  } else {
    dice.style.opacity = "0.2";
    diceOnHold[diceNumber] = true;
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
