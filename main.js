const playersAdded = [];

function addPlayers() {
  const players = document.getElementById('playerId').value.trim();
  playersAdded.push(players);
  document.getElementById('display').innerText += players + '\n';
  document.getElementById("playerId").value = "";
}

function deletePlayer() {
  const players = document.getElementById('playerId').value.trim();

  if (players !== "") {
    const index = playersAdded.indexOf(players);

    if (index > -1) {
      playersAdded.splice(index, 1);
      document.getElementById('display').innerText = playersAdded.join('\n');
    }

    document.getElementById("playerId").value = "";
  }
}

element.addEventListener("click, addScore()");

function addScore() {
    let diceScore = document.getElementById("score");
    if (diceScore + currentScore < 1000){
        currentScore = 0;
    }
    else {
        currentScore = diceScore + currentScore;
    }   
}

function rulTerning() {

    const imgs = [
        'imgs/dices1.png',
        'imgs/dices2.png',
        'imgs/dices3.png',
        'imgs/dices4.png',
        'imgs/dices5.png',
        'imgs/dices6.png'
    ];

    for (let i=1; i <= 6; i++) {

        const randomIndex = Math.floor(Math.random() * imgs.length);

        document.getElementById('dices' + i).src = imgs [randomIndex];

    }

}

let diceOnHold = [false, false, false, false, false, false];
let diceValues = [0, 0, 0, 0, 0, 0];
// var totalScore;
// var roundScore = 0;
triggerNextRound = true;

function TriggerOnOfHold(dice) {
  if (triggerNextRound) {
    return;
  }

  let diceNumber = parseInt(dice.id.replace("dices1", "")) - 1;

  if (diceOnHold[diceNumber]) {
    dice.style.opacity = "1";
    diceOnHold[diceNumber] = false;
  } else {
    dice.style.opacity = "0.2";
    diceOnHold[diceNumber] = true;
  }
}

// function calculateCurrentScore() {
//   roundScore + totalScore;
// }

