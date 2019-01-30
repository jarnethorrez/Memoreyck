import BrushTimer from '../js/classes/BrushTimer';
import Scan from '../js/classes/Scan';

const $overlay = document.querySelector(`.overlay-js`);
const $popup = document.querySelector(`.popup-js`);
const $alreadyPlayedGamePopup = document.querySelector(`.alreadyPlayedGamePopup-js`);
const $newScoreElements = document.querySelectorAll(`.newScore-js`);
let scan;
let penselen;

const init = () => {
    penselen = window.localStorage.getItem("score");
    scan = new Scan(penselen, scanComplete, alreadyPlayedGame, 2);


    const $scanInput = document.querySelector(`.scanInput`);
    $scanInput.addEventListener('input', handleScan);
}

const handleScan = e => {
    e.preventDefault();

    if (e.target.value.length == 6) {
        scan.checkUser(e.target.value);
    }
}

const alreadyPlayedGame = () => {
    let timer = new BrushTimer(8, timeUp);
    timer.draw();

    $overlay.classList.add(`overlay`);
    $alreadyPlayedGamePopup.classList.remove(`hidden`);
}

const scanComplete = () => {
    let timer = new BrushTimer(8, timeUp);
    timer.draw();

    $newScoreElements.forEach(newScoreElement => {
        newScoreElement.innerHTML = scan.newScore.toString()
    })

    $overlay.classList.add(`overlay`);
    $popup.classList.remove(`hidden`);

}

const timeUp = () => {
    window.location.href = "index.html";
}

init();
