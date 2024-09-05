const playersAdded = [];

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



// element.addEventListener("click, addScore()");
// function addScore() {
//   let diceScore = document.getElementById("score");
//   if (diceScore + currentScore < 1000) {
//     currentScore = 0;
//   } else {
//     currentScore = diceScore + currentScore;
//   }
// }

let currentRound 

function checkForPoints() {
    var diceOnHoldString = diceOnHold.toString(); 
    if(diceOnHoldString == "1,2,3,4,5,6")
        currentRound+=1000;
    else if(diceOnHoldString == "1")
        currentRound+=100; 
    console.log(currentRound);
}

