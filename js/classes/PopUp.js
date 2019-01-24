class PopUp {
  constructor(imgPath, title, text, popupFinished) {
    const $container = document.createElement(`div`);
    $container.classList.add('popup-container');

    const $picture = document.createElement(`img`);
    $picture.src = imgPath;
    $picture.classList.add('popup-image');
    $picture.setAttribute('draggable', 'false');

    const $info = document.createElement(`div`);
    $info.classList.add('popup-info');

    const $title = document.createElement(`h1`);
    $title.innerText = title;
    $title.classList.add('popup-title');

    const $text = document.createElement(`p`);
    $text.innerText = text;
    $text.classList.add(`popup-text`);

    const $close = document.createElement(`img`);
    $close.src = '../assets/img/close.png';
    $close.classList.add('popup-close');
    $close.setAttribute('draggable', 'false');

    $info.appendChild($title);
    $info.appendChild($text);
    $info.appendChild($close);

    $container.appendChild($info);
    $container.appendChild($picture);

    $container.addEventListener('click', e => {this.handleContainerClicked(e, this.popupFinished)});

    this.$container = $container;
    this.popupFinished = popupFinished;

  }

  draw() {
    const $body = document.querySelector(`body`);
    $body.prepend(this.$container);
  }

   handleContainerClicked(e, callback) {

    const $img = document.querySelector(`.popup-image`);
    $img.style.opacity = '1';
    $img.style.animationDelay = '0ms';
    $img.style.animationName = 'opacityDown';
    $img.style.animationFillMode = 'forwards';


    const $info = document.querySelector(`.popup-info`);
    $info.style.animationDelay = '250ms';
    $info.style.animationName = 'downScale';
    $info.style.animationFillMode = 'forwards';

    const $container = document.querySelector(`.popup-container`);
    $container.style.animationName = 'fadeOutPopup';
    $container.style.animationFillMode = 'forwards';

    setTimeout(() => {
      const $container = document.querySelector(`.popup-container`);
      document.body.removeChild($container);
      callback();
    }, 750, callback);


  }



}

module.exports = PopUp
