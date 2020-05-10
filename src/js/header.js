import '../style/header.css';

export default function createHeader() {
  const header = document.createElement('header');
  header.classList.add('header');

  const image = document.createElement('img');
  image.classList.add('header__image');
  image.setAttribute('src', './img/header-image.png');
  header.append(image);

  const text = document.createElement('h1');
  text.classList.add('header__text');
  text.innerHTML = 'Search';
  header.append(text);

  const subText = document.createElement('span');
  subText.classList.add('header__subtext');
  subText.innerHTML = 'Movie';
  text.prepend(subText);

  document.body.append(header);
}
