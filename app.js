let gameseq = [];
let userSeq = [];
let highestScore = [];

let btns = ["green", "red", "yellow", "orange"];

let started = false;
let level = 0;

document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;

    levelUp();
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 1000);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 1000);
}

function levelUp() {
  userSeq = [];
  level++;
  let p = document.querySelector("p");
  p.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * btns.length);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`#${randColor}`);
  gameseq.push(randColor);
  btnFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameseq[idx]) {
    if (userSeq.length == gameseq.length) {
      setTimeout(levelUp, 1500);
    }
  } else {
    let score = level;
    highestScore.push(score);
    let max = highScore();
    let p = document.querySelector("p");
    p.innerHTML = `Game Over! <b>Your score was ${level}</b> <br> Highest Score: <b>${max}</b><br> Press any key to restart`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 250);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function highScore() {
  if (highestScore.length === 0) return 0;
  let max = highestScore[0];
  for (let i = 1; i < highestScore.length; i++) {
    if (highestScore[i] > max) {
      max = highestScore[i];
    }
  }

  return max;
}

function reset() {
  started = false;
  level = 0;
  gameseq = [];
  userSeq = [];
}
