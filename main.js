const playersAdded = [];
const diceValues = [1, 2, 3, 4, 5, 6];
let diceOnHold = [false, false, false, false, false, false];
let heldDiceValues = [null, null, null, null, null, null];

function TriggerOnOfHold(dice) {
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

element.addEventListener("click, addScore()");

function addScore() {
  let diceScore = document.getElementById("score");
  if (diceScore + currentScore < 1000) {
    currentScore = 0;
  } else {
    currentScore = diceScore + currentScore;
  }
}

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
    // const randomIndex = Math.floor(Math.random() * imgs.length);

    // document.getElementById("dices" + i).src = imgs[randomIndex];
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
