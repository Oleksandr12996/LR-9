
document.body.style.textAlign = "center";
const playerName = prompt("Введіть ваше ім’я:") || "Гравець";

const score = document.createElement("h2");
score.textContent = `${playerName} vs Комп'ютер`;
document.body.appendChild(score);

const roundInfo = document.createElement("h3");
roundInfo.textContent = "Раунд 1 із 3";
document.body.appendChild(roundInfo);

const gameArea = document.createElement("div");
gameArea.id = "gameArea";
document.body.appendChild(gameArea);

const result = document.createElement("h2");
document.body.appendChild(result);

const playBtn = document.createElement("button");
playBtn.textContent = "Грати";
playBtn.className = "btn";
document.body.appendChild(playBtn);

const resetBtn = document.createElement("button");
resetBtn.textContent = "Грати знову";
resetBtn.className = "btn";
resetBtn.style.display = "none";
document.body.appendChild(resetBtn);

const cards = [
  { rank: "6", value: 6 },
  { rank: "7", value: 7 },
  { rank: "8", value: 8 },
  { rank: "9", value: 9 },
  { rank: "10", value: 10 },
  { rank: "J", value: 2 },
  { rank: "Q", value: 3 },
  { rank: "K", value: 4 },
  { rank: "A", value: 11 }
];

let round = 1;
let playerTotal = 0;
let compTotal = 0;

function createCard(rank) {
  const card = document.createElement("div");
  card.className = "card";
  card.textContent = rank;
  setTimeout(() => card.classList.add("show"), 100);
  return card;
}

function playRound() {
  if (round > 3) return;

  gameArea.innerHTML = "";

  const playerCard = cards[Math.floor(Math.random() * cards.length)];
  const compCard = cards[Math.floor(Math.random() * cards.length)];

  playerTotal += playerCard.value;
  compTotal += compCard.value;

  const playerDiv = document.createElement("div");
  const compDiv = document.createElement("div");

  const playerTitle = document.createElement("h3");
  playerTitle.textContent = playerName;
  const compTitle = document.createElement("h3");
  compTitle.textContent = "Комп'ютер";

  const playerCardEl = createCard(playerCard.rank);
  const compCardEl = createCard(compCard.rank);

  playerDiv.append(playerTitle, playerCardEl);
  compDiv.append(compTitle, compCardEl);

  gameArea.append(playerDiv, compDiv);

  result.textContent = `${playerName}: ${playerTotal} | Комп'ютер: ${compTotal}`;

  if (round === 3) {
    playBtn.disabled = true;
    setTimeout(showFinalResult, 1000);
  } else {
    round++;
    roundInfo.textContent = `Раунд ${round} із 3`;
  }
}

function showFinalResult() {
  if (playerTotal > compTotal) {
    result.textContent = `${playerName} переміг із ${playerTotal} очками!`;
  } else if (playerTotal < compTotal) {
    result.textContent = `Комп'ютер переміг із ${compTotal} очками!`;
  } else {
    result.textContent = "Нічия!";
  }
  resetBtn.style.display = "inline-block";
}

function resetGame() {
  round = 1;
  playerTotal = 0;
  compTotal = 0;
  gameArea.innerHTML = "";
  result.textContent = "";
  roundInfo.textContent = "Раунд 1 із 3";
  playBtn.disabled = false;
  resetBtn.style.display = "none";
}

playBtn.addEventListener("click", playRound);
resetBtn.addEventListener("click", resetGame);
