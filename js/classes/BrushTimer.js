// const TweenLite = require('../../node_modules/gsap/src/uncompressed/TweenLite');
// require('../../node_modules/gsap/src/uncompressed/plugins/CSSPlugin');

class BrushTimer {

    constructor(seconds, timeUp) {
        this.time = seconds;
        this.timeUp = timeUp;
        this.$brushStroke = document.querySelector(`.brush-timer`);
    }

    draw() {

        this.$brushStroke.style.animationName = 'brushTimer';
        this.$brushStroke.style.animationDuration = `${this.time}s`;
        this.$brushStroke.style.animationTimingFunction = 'linear';
        this.$brushStroke.style.animationFillMode = 'forwards';

        setTimeout(() => {
          this.timeUp();
        }, this.time*1000);
    }
}

module.exports = BrushTimer
