import '../style/search.css';
import Keyboard from './keyboard';

export default class Search {
  constructor() {
    this.search = null;
    this.searchInput = null;
    this.searchLoader = null;
    this.searchButton = null;

    this.clearInputEvent = this.clearInputEvent.bind(this);
  }

  init() {
    this.createSearchWrap();
    this.createSearchInput();
    this.createSearchLoader();
    this.createClearInputElement();
    this.createSearchButton();
    this.initKeyboard();

    this.search.append(this.keyboard.createKeyboardIcon());
  }

  createSearchWrap() {
    this.search = document.createElement('div');
    this.search.classList.add('search');
    document.body.append(this.search);
  }

  createSearchInput() {
    this.searchInput = document.createElement('input');
    this.searchInput.classList.add('search__input');
    this.searchInput.setAttribute('placeholder', 'Search movie');
    this.searchInput.setAttribute('type', 'text');
    this.search.append(this.searchInput);
  }

  createSearchLoader() {
    this.searchLoader = document.createElement('img');
    this.searchLoader.classList.add('search__loader');
    this.searchLoader.setAttribute('src', './img/loader.svg');
    this.search.append(this.searchLoader);
  }

  createClearInputElement() {
    this.clearInputElement = document.createElement('img');
    this.clearInputElement.classList.add('search__clear-input');
    this.clearInputElement.setAttribute('src', './img/clear.svg');

    this.clearInputElement.addEventListener('click', this.clearInputEvent);

    this.search.append(this.clearInputElement);
  }

  clearInputEvent() {
    this.searchInput.value = '';
  }

  createSearchButton() {
    this.searchButton = document.createElement('button');
    this.searchButton.classList.add('search__button');
    this.searchButton.setAttribute('type', 'submit');
    this.searchButton.innerHTML = 'Search';
    this.search.append(this.searchButton);
  }

  showLoader() {
    this.searchLoader.classList.add('search__loader-active');
  }

  hideLoader() {
    this.searchLoader.classList.remove('search__loader-active');
  }

  initKeyboard() {
    this.keyboard = new Keyboard();
    this.keyboard.init();
  }
}
