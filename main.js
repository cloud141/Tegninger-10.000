const playersAdded = [];
const diceValues = [1, 2, 3, 4, 5, 6];
let diceOnHold = [false, false, false, false, false, false];
let heldDiceValues = [];
let gameStarted = false; //state to handle if game is started or not
let currentScore = 0;

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
  } else {
    dice.style.opacity = "0.2";
    diceOnHold[diceNumber] = true;
    heldDiceValues[diceNumber] = diceValues[diceNumber];
  }

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
  checkForPoints();
}

function rulTerning() {
  // const randomIndex = Math.floor(Math.random() * imgs.length);
  // document.getElementById("dices" + i).src = imgs[randomIndex];
  console.table(heldDiceValues);
  rerollAllDice();
}

function checkForPoints() {
  let currentRound = "";
  let diceHoldOnSort = heldDiceValues.sort();
  diceHoldOnSort.reverse();
  let diceHoldOnString = diceHoldOnSort.toString();
  if (diceHoldOnString == "1,2,3,4,5,6") currentRound += 1000;
  if (diceHoldOnString == "1") currentRound += 100;
  console.log(currentRound);
}

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
