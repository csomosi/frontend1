// először az értékadásnál LET-el kezdtük, majd előre tettük a LET változó deklarálást és később értéket adtunk neki, de a szöveget már nem változtattam.

let scores, roundScore, activePlayer;

// both player starts with 0, define an array for scores:
function newGame() {
  scores = [0, 0];

  // variable for the actual player's points in the actual round:

  roundScore = 0;

  // variable to indicate who is the active player (0 or 1):

  activePlayer = 0;

  // select the HTML element with # ID and modyfy the text content to 0:
  document.querySelector("#score-0").textContent = 0;
  document.querySelector("#score-1").textContent = 0;
  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;

  // by starting the app, the dice is invisible:

  document.querySelector(".dice").style.display = "none";

  // finishing a game, we set a lot of things, so for new game we need to set them to default:
  document.querySelector(".btn-roll").style.display = "block";
  document.querySelector(".btn-hold").style.display = "block";
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

newGame();
// toss the dice:

document.querySelector(".btn-roll").addEventListener("click", function () {
  // 1. generate a random  nuber betw. 1-6
  const dice = Math.floor(Math.random() * 6 + 1);

  // 2. print the number on UI:
  document.querySelector(".dice").style.display = "block";

  // 3. change the dice picture to the tossed value:
  document.querySelector(".dice").setAttribute("src", `dice-${dice}.png`);

  // A $ jeles megoldás helyett lejhene így is öszerakni a fájlnevet:
  // 'dice-'+dice+'.png'

  // If tossed value is other than 1 we add the value.
  if (dice !== 1) {
    roundScore = roundScore + dice;
    // show player's result on UI:
    document.querySelector("#current-" + activePlayer).textContent = roundScore;

    // if tossed value is 1 then points are lost, and other player's turn.
  } else {
    nextPlayer();
  }
});

// creating a function for the above {else} code-portion (other player's turn)
function nextPlayer() {
  roundScore = 0;
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  // refresh UI:

  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

document.querySelector(".btn-hold").addEventListener("click", function () {
  // 1. player holds points:
  scores[activePlayer] = scores[activePlayer] + roundScore;
  // you can reach the same result with this shorter code:
  // scores[activePlayer] += roundScore;

  // 2. refresh UI:
  document.querySelector("#score-" + activePlayer).textContent =
    scores[activePlayer];

  // 3. is there a winner?
  if (scores[activePlayer] >= 20) {
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.add("winner");
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.remove("active");
    document.querySelector("#name-" + activePlayer).textContent = "Winner!";
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".btn-roll").style.display = "none";
    document.querySelector(".btn-hold").style.display = "none";
  } else {
    // if player doesn't win, than the other player's round
    nextPlayer();
  }
});

document.querySelector(".btn-new").addEventListener("click", newGame);

// ----- hogyan működik a függvény átadása egy másik függvénynek?

// function buttonClicked() {
//   console.log("megnyom");
// }

// function handleEvent(myFunction) {
//   myFunction();
// }

// handleEvent(buttonClicked);
// -----
