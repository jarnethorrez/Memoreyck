const BrushTimer = require('../js/classes/BrushTimer');

let scanned = false;
const $overlay = document.querySelector(`.overlay-js`);
const $popup = document.querySelector(`.popup-js`);

const init = () => {
    setTimeout(() => {
        scanned = true
        if (scanned) {
            scanComplete();
        }
    }, 3000);
}

const scanComplete = () => {
    $overlay.classList.add(`overlay`);
    $popup.classList.remove(`hidden`);

    let timer = new BrushTimer(4, timeUp);
    timer.draw();
}

const timeUp = () => {
    window.location.href = "index.html";
}

init();
