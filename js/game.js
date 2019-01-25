const Clock = require(`../js/classes/Clock`);
const PopUp = require(`../js/classes/PopUp`);

const cards = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
const info = [
  'Een duif, recht boven het lam. Een representatie voor de aanwezigheid van Christus',
  'Het lam bloedt in een gouden kelk. Zonder enige emotie, een verwijzing naar Christus zijn zelfopoffering.',
  'De twaalf apostelen, de dichtste volgers van Christus kunnen natuurlijk niet ontbreken.',
  'Dit zijn 2 pausen en een antipaus. Ze representeren een turbulente periode van de kerk.',
  'Deze 2 mannen zijn profeten die de komst van Christus voorspeld hebben.',
  'De vele herkenbare planten worden afgebeeld met bijna perfecte biologische nauwkeurigheid.'
]

let score = 0;
let $hints;
let $colorFeedback;
let time = 60;
let c;
let selectedCards = [];

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
}

const createCards = () => {

  $cardDeck = document.querySelector(`.card-deck`);

  for (let i = 0; i < 12; i++) {
    $cardDeck.appendChild(createCard(i));
  }
  c.startTimer();
}

const createCard = i => {
  $playableCard = document.createElement(`div`);
  $playableCard.classList.add(`playableCard`);
  $playableCard.classList.add(`unguessed`);
  $playableCard.id = `${cards[i]}`;

  $inner = document.createElement(`div`);
  $inner.classList.add('inner');

  $front = document.createElement(`div`);
  $front.classList.add(`front`);
  $front.style.backgroundImage = (`url(../assets/img/detail-${cards[i]}.png)`);

  $back = document.createElement(`div`);
  $back.classList.add(`back`);

  $inner.appendChild($front);
  $inner.appendChild($back);

  $playableCard.appendChild($inner);

  $playableCard.addEventListener(`click`, handleCardClick);

  return $playableCard;
}

const handleCardClick = e => {
  selectedCards.push(e.currentTarget.id);

  if (selectedCards.length == 2) {
    checkPair();
    const $inner = e.currentTarget.querySelector(`.inner`);
    $inner.classList.add(`rotatedCard`);
  } else if(selectedCards.length < 3) {
    const $inner = e.currentTarget.querySelector(`.inner`);
    $inner.classList.add(`rotatedCard`);
  }
}

const checkPair = () => {

  if(selectedCards[0] == selectedCards[1]) {
    let id = selectedCards[0];
    setTimeout(() => {
      const $guessed = document.querySelectorAll(`.rotatedCard`);
      $guessed.forEach($card => {
        $card.parentElement.classList.remove(`unguessed`);
      });

      c.pauseTime();
      const p = new PopUp(`../assets/img/detail-${id}.png`, 'Paar gevonden!', info[id-1], popupClose);
      p.draw();

      selectedCards = [];
    }, 500);


  } else {
    setTimeout(() => {
      const $unguessedCards = document.querySelectorAll(`.unguessed`);
      $unguessedCards.forEach($card => {
        const $inner = $card.querySelector(`.inner`);
        if($inner.classList.contains(`rotatedCard`)) {
          $inner.classList.remove(`rotatedCard`);
        }
      });
      selectedCards = [];
    }, 1000);
  }

}

const popupClose = () => {
  c.unpauseTime();
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
