import '../style/keyboard.css';

const languages = {
  ENG: 'eng',
  RUS: 'rus',
};
export default class Keyboard {
  constructor() {
    this.elements = {
      container: null,
      textarea: null,
      keys: [],
    };

    this.configs = {
      lowEngKeys: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter', 'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift', 'Ctrl', 'Win', 'Alt', 'english', 'Alt', '←', '↓', '→', 'Ctrl'],
      upEngKeys: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace', 'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'Q', 'P', '{', '}', '|', 'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter', 'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '↑', 'Shift', 'Ctrl', 'Win', 'Alt', 'ENGLISH', 'Alt', '←', '↓', '→', 'Ctrl'],
      lowRuKeys: ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'Shift', 'Ctrl', 'Win', 'Alt', 'русский', 'Alt', '←', '↓', '→', 'Ctrl'],
      upRuKeys: ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace', 'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter', 'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '↑', 'Shift', 'Ctrl', 'Win', 'Alt', 'РУССКИЙ', 'Alt', '←', '↓', '→', 'Ctrl'],
      keyClasses: ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'],
    };

    this.language = languages.ENG;
    this.capsLock = false;

    this.pressed = new Set();

    this.keyboardIconEvent = this.keyboardIconEvent.bind(this);
  }

  init() {
    this.keyboard = document.createElement('div');
    this.keyboard.classList.add('keyboard', 'hidden');
    document.body.append(this.keyboard);

    this.keyboard.append(this.createKeys());
    this.createChangeLanguageElement();
    this.createCloseKeyboardElement();
    this.enterKey = document.querySelector('.Enter');

    this.elements.container = document.querySelector('.keyboard__container');
    this.elements.keys = document.querySelectorAll('.keyboard__key');
    this.elements.textarea = document.querySelector('.search__input');

    this.keyboard.addEventListener('mousedown', (event) => {
      this.eventKeyDown(event);
    });
    this.keyboard.addEventListener('mouseup', (event) => {
      this.eventKeyUp(event);
    });
    this.keyboard.addEventListener('mouseout', (event) => {
      event.target.classList.remove('keyboard__key_active');
    });
  }

  createKeys() {
    const container = document.createElement('div');
    container.classList.add('keyboard__container');

    this.configs.keyClasses.forEach((eachClass) => {
      const key = document.createElement('button');
      key.classList.add(eachClass, 'keyboard__key');
      container.append(key);
      this.elements.keys.push(key);
    });

    if (localStorage.language === languages.ENG || localStorage.language === undefined) {
      for (let i = 0; i < this.configs.lowEngKeys.length; i += 1) {
        this.elements.keys[i].innerHTML = this.configs.lowEngKeys[i];
      }
    } else {
      for (let i = 0; i < this.configs.lowRuKeys.length; i += 1) {
        this.elements.keys[i].innerHTML = this.configs.lowRuKeys[i];
      }
    }

    return container;
  }

  changeKeys(configKeys) {
    for (let i = 0; i < configKeys.length; i += 1) {
      this.elements.keys[i].innerHTML = configKeys[i];
    }
  }

  capsLockToggle() {
    if (this.capsLock === false) {
      if (this.language === languages.ENG) {
        this.changeKeys(this.configs.upEngKeys);
      } else {
        this.changeKeys(this.configs.upRuKeys);
      }
    } else if (this.language === languages.ENG) {
      this.changeKeys(this.configs.lowEngKeys);
    } else {
      this.changeKeys(this.configs.lowRuKeys);
    }
    this.capsLock = this.capsLock === false;
  }

  languageToggle() {
    if (this.language === languages.ENG) {
      this.changeKeys(this.configs.lowRuKeys);
    } else {
      this.changeKeys(this.configs.lowEngKeys);
    }
    this.language = this.language === languages.ENG ? languages.RUS : languages.ENG;
    localStorage.setItem('language', this.language);
  }

  createChangeLanguageElement() {
    this.changeLanguageElement = document.createElement('p');
    if (localStorage.language === languages.ENG || !localStorage.language) {
      this.changeLanguageElement.innerHTML = languages.ENG;
    } else {
      this.changeLanguageElement.innerHTML = languages.RUS;
    }
    this.changeLanguageElement.classList.add('keyboard__change-language');
    this.keyboard.append(this.changeLanguageElement);

    this.changeLanguageElement.addEventListener('click', () => {
      this.languageToggle();
      this.changeLanguageElement.innerHTML = this.language;
    });
  }

  createCloseKeyboardElement() {
    this.closeKeyboardElement = document.createElement('p');
    this.closeKeyboardElement.innerHTML = '✖';
    this.closeKeyboardElement.classList.add('keyboard__close-keyboard');
    this.keyboard.append(this.closeKeyboardElement);

    this.closeKeyboardElement.addEventListener('click', () => {
      this.keyboard.classList.add('hidden');
    });
  }

  createKeyboardIcon() {
    this.keyboardIcon = document.createElement('img');
    this.keyboardIcon.classList.add('search__keyboard-icon');
    this.keyboardIcon.setAttribute('src', './img/keyboard.svg');

    this.keyboardIcon.addEventListener('click', this.keyboardIconEvent);

    return this.keyboardIcon;
  }

  keyboardIconEvent() {
    this.keyboard.classList.toggle('hidden');
  }

  hide() {
    this.keyboard.classList.add('hidden');
  }

  eventKeyDown(event) {
    if (event.target.classList.contains('keyboard__key')) {
      const key = document.querySelector(`.${event.target.classList[0]}`);

      key.classList.add('keyboard__key_active');

      switch (key.classList[0]) {
        case 'CapsLock': {
          this.capsLockToggle();
          break;
        }
        case 'Space': {
          this.elements.textarea.value += ' ';
          break;
        }
        case 'Tab': {
          this.elements.textarea.value += '       ';
          break;
        }
        case 'Backspace': {
          this.elements.textarea.value = this.elements.textarea.value.slice(0, -1);
          break;
        }
        case 'Enter': {
          this.elements.textarea.value += '\n';
          break;
        }
        default:
      }

      if (key.classList[0] === 'ShiftLeft' && !this.pressed.has('ShiftLeft')) { this.capsLockToggle(); }

      this.pressed.add(event.code);

      if (this.pressed.has('ShiftLeft') && this.pressed.has('ControlLeft')) {
        this.languageToggle();
      }

      if (key.innerHTML.length === 1) { this.elements.textarea.value += key.innerHTML; }
    }
  }

  eventKeyUp(event) {
    if (event.target.classList.contains('keyboard__key')) {
      const key = document.querySelector(`.${event.target.classList[0]}`);

      key.classList.remove('keyboard__key_active');

      if (key.classList[0] === 'CapsLock' && this.capsLock) {
        key.classList.add('keyboard__key_active');
      }
      if (key.classList[0] === 'ShiftLeft') {
        this.capsLockToggle();
      }
    }

    this.pressed.delete(event.code);
  }
}
