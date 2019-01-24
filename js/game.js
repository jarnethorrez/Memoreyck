const Clock = require(`../js/classes/Clock`);
const PopUp = require(`../js/classes/PopUp`);

let score = 0;
let $hints;
let $colorFeedback;
let time = 60;
let c;

const init = () => {
    initializeClock();
}

const initializeClock = () => {
  c = new Clock(time, timeUp);
  c.draw();
  //c.startTimer();
}


const timeUp = () => {
  console.log("Time's up");
  if(getScore()) {
      localStorage.setItem(`score`, getScore());
      window.location.href = "endGood.html";
  } else {
    window.location.href = "endBad.html";
  }
}

init();
