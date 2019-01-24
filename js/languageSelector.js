let $languageSelector;
let $chosenLanguageShort;
const $overlay = document.querySelector(`.overlay-js`);
const languages = ['🇳🇱 Nederlands', '🇫🇷 Français', '🇬🇧 English', '🇪🇸 Espagnol', '🇩🇪 Deutsch', '🇮🇹 Italiano'];
const languagesShort = ['🇳🇱 NL', '🇫🇷 FR', '🇬🇧 EN', '🇪🇸 ES', '🇩🇪 DE', '🇮🇹 IT'];

const init = () => {

    $languageSelector = document.querySelector(`.languageSelector`);
    $languageSelector.addEventListener(`click`, handleLSClick);
    $overlay.addEventListener(`click`, handleOverlayClick);

}

const closeList = () => {
  $short = document.createElement(`p`);
  $short.innerText = $chosenLanguageShort;

  $languageSelector.innerHTML = ``
  $languageSelector.appendChild($short);

  $languageSelector.classList.remove(`LSOpen`);
  $overlay.classList.remove(`overlay`);
}

const handleLSClick = e => {


  if(!$languageSelector.classList.contains(`LSOpen`)) {

    const $languageList = createLanguageList();

    $chosenLanguageShort = $languageSelector.innerText;
    $languageSelector.innerHTML = '';

    $languageSelector.appendChild($languageList);
    $languageSelector.classList.add(`LSOpen`);
    $overlay.classList.add(`overlay`);

  } else {
    closeList();
  }

}

const handleLanguageClick = e => {
  const selectedLanguage = e.currentTarget.innerText;
  const index = languages.indexOf(selectedLanguage);
  $chosenLanguageShort = languagesShort[index];

  console.log('close the list');
}

const createLanguageList = () => {

  $languageList = document.createElement(`ul`);

  languages.forEach(language => {

    const $li = document.createElement(`li`);
    $li.innerText = language;
    $languageList.appendChild($li);
    $li.addEventListener(`click`, handleLanguageClick);

  });

  return $languageList;

}

const handleOverlayClick = e => {
  closeList();
}

init();
