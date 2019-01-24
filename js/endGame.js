const BrushTimer = require('../js/classes/BrushTimer');

let score;
let $scoreElements;

const init = () => {
    score = localStorage.getItem("score");
    setScore();

    let timer = new BrushTimer(5, timeUp);
    timer.draw();
}

const setScore = () => {
    $scoreElements = document.querySelectorAll(`.score-js`);
    $scoreElements.forEach(scoreElement => {
        scoreElement.innerHTML = score.toString();
    })
}

const timeUp = () => {
    window.location.href = "index.html";
}

init();
