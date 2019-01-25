const Clock = require(`../js/classes/Clock`);
const PopUp = require(`../js/classes/PopUp`);

const cards = [
  [1, `detailOne.png`],
  [2, `detailTwo.png`],
  [3, `detailThree.png`],
  [4, `detailFour.png`],
  [5, `detailFive.png`],
  [6, `detailSix.png`],
  [1, `detailOne.png`],
  [2, `detailTwo.png`],
  [3, `detailThree.png`],
  [4, `detailFour.png`],
  [5, `detailFive.png`],
  [6, `detailSix.png`]
];

let score = 0;
let $hints;
let $colorFeedback;
let time = 60;
let c;

const init = () => {
    initializeClock();
    // wait for intro CSS animation to finish
    setTimeout(() => {

      resetDom();
      createCards();
      shuffle(cards);
      console.log(cards);


    }, 4500);
}

const resetDom = () => {
  $painting = document.querySelector(`.painting`);
  $painting.classList.remove('painting');
  $painting.classList.add('card-deck');
  $painting.innerHTML = ``;
}

const initializeClock = () => {
  c = new Clock(time, timeUp);
  c.draw();
  //c.startTimer();
}

const createCards = () => {

  $cardDeck = document.querySelector(`.card-deck`);

  for (let i = 0; i < 12; i++) {
    $cardDeck.appendChild(createCard(i));
  }
}

const createCard = i => {
  $playableCard = document.createElement(`div`);
  $playableCard.classList.add(`playableCard`);
  $playableCard.id = `${cards[i][0]}`;

  $inner = document.createElement(`div`);
  $inner.classList.add('inner');

  $front = document.createElement(`div`);
  $front.classList.add(`front`);
  $front.style.backgroundImage = (`url(../assets/img/${cards[i][1]})`);

  $back = document.createElement(`div`);
  $back.classList.add(`back`);

  $inner.appendChild($front);
  $inner.appendChild($back);

  $playableCard.appendChild($inner);

  return $playableCard;
}

const shuffle = (o) => {
  for(let j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
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
