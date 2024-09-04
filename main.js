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
