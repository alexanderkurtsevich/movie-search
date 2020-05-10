import createHeader from './header';
import createFooter from './footer';
import Search from './search';
import Notification from './notification';
import Swiper from './swiper/swiper.min';
import swiperSettings from './swiperSettings';
import apiKeys from './apiKeys';
import '../style/style.css';
import '../style/swiper.min.css';
import '../style/swiper.css';

export default class MovieSearch {
  constructor() {
    this.searchButtonEvent = this.searchButtonEvent.bind(this);
    this.loadUpSlides = this.loadUpSlides.bind(this);
    this.SearchInputEnterKeySubmit = this.SearchInputEnterKeySubmit.bind(this);

    this.lastLoadedPageNumber = 1;
    this.translatedText = 'dream';
  }

  init() {
    createHeader();
    this.search = new Search();
    this.search.init();
    this.notification = new Notification();
    this.notification.init();
    MovieSearch.createSwiperMarkup();
    this.swiperInit();
    this.createAllSlides(this.translatedText);
    createFooter();

    this.search.searchButton.addEventListener('click', this.searchButtonEvent);
    this.search.keyboard.keyboard.addEventListener('click', this.SearchInputEnterKeySubmit);
    this.search.searchInput.addEventListener('keyup', this.SearchInputEnterKeySubmit);
    this.mySwiper.on('slideChange', this.loadUpSlides);
  }

  async getMovieData(title, page = 1) {
    this.search.showLoader();

    const url = `https://www.omdbapi.com/?s=${title}&page=${page}&apikey=${apiKeys.OMDb}`;
    const response = await fetch(url);
    const moviesData = await response.json();

    if (moviesData.Response === 'False') {
      throw new Error(`No results for ${title}`);
    }

    await MovieSearch.addMovieRating(moviesData.Search);
    return moviesData;
  }

  static async addMovieRating(moviesData) {
    /* eslint-disable */
    for (const movie of moviesData) {
      const url = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKeys.OMDb}`;
      const response = await fetch(url);
      const ratingData = await response.json();
      movie.Rating = ratingData.imdbRating;
    }
    /* eslint-enable */
  }

  static async translateText(text) {
    if (text === '') {
      throw new Error('Search input cannot be empty');
    }
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${apiKeys.yandexTranslate}&text=${text}&lang=ru-en`;
    const response = await fetch(url);
    const translateData = await response.json();
    const translatedText = translateData.text.toString();
    return translatedText;
  }

  swiperInit() {
    this.mySwiper = new Swiper('.swiper-container', swiperSettings);
  }

  static createSwiperMarkup() {
    const swiper = document.createElement('div');
    swiper.classList.add('swiper');

    const swiperContainer = document.createElement('div');
    swiperContainer.classList.add('swiper-container');

    const swiperWrapper = document.createElement('div');
    swiperWrapper.classList.add('swiper-wrapper');

    const swiperButtonPrev = document.createElement('div');
    swiperButtonPrev.classList.add('swiper-button-prev');

    const swiperButtonNext = document.createElement('div');
    swiperButtonNext.classList.add('swiper-button-next');

    swiperContainer.append(swiperWrapper);
    swiper.append(swiperContainer);
    swiper.append(swiperButtonPrev);
    swiper.append(swiperButtonNext);
    document.body.append(swiper);
  }

  createEachSlide(movie) {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');

    const movieYear = document.createElement('p');
    movieYear.classList.add('swiper-slide__year');
    movieYear.innerHTML = movie.Year;

    const movieRating = document.createElement('p');
    movieRating.classList.add('swiper-slide__rating');
    movieRating.innerHTML = movie.Rating;

    const movieTitle = document.createElement('a');
    movieTitle.classList.add('swiper-slide__title');
    movieTitle.innerHTML = movie.Title;
    movieTitle.setAttribute('href', `https://www.imdb.com/title/${movie.imdbID}/videogallery/`);

    slide.append(MovieSearch.createMoviePoster(movie));
    slide.append(movieYear);
    slide.append(movieRating);
    slide.append(movieTitle);

    this.mySwiper.appendSlide(slide);
  }

  static createMoviePoster(movie) {
    const notApplicable = 'N/A';
    const defaultPoster = './img/defaultPoster.png';

    const poster = document.createElement('img');
    poster.src = movie.Poster === notApplicable ? defaultPoster : movie.Poster;
    poster.classList.add('swiper-slide__image', 'swiper-lazy');
    poster.onerror = function setDefaultPoster() { poster.src = defaultPoster; };

    return poster;
  }

  createAllSlides(title, page, firstTime = false) {
    this.getMovieData(title, page)
      .then((moviesData) => {
        if (firstTime === true) {
          this.mySwiper.removeAllSlides();
          this.lastLoadedPageNumber = 1;
          this.mySwiper.slideTo(0);
        }
        moviesData.Search.forEach((movie) => this.createEachSlide(movie));
        this.mySwiper.update();
        this.notification.changeText(`Showing results for "${title}"`);
        this.translatedText = title;
      })
      .catch((error) => this.notification.changeText(error, true))
      .finally(() => this.search.hideLoader());
  }

  loadUpSlides() {
    const numberOfCardsPerPage = 10;
    if (this.mySwiper.activeIndex > this.lastLoadedPageNumber * numberOfCardsPerPage - 6) {
      this.lastLoadedPageNumber += 1;
      this.createAllSlides(this.translatedText, this.lastLoadedPageNumber);
    }
  }

  searchButtonEvent() {
    MovieSearch.translateText(this.search.searchInput.value)
      .then((translatedText) => this.createAllSlides(translatedText, 1, true))
      .catch((error) => this.notification.changeText(error, true))
      .finally(() => this.search.keyboard.hide());
  }

  SearchInputEnterKeySubmit(event) {
    const enterKeyCode = 13;
    if (event.keyCode === enterKeyCode
            || event.target === this.search.keyboard.enterKey) {
      this.search.searchButton.click();
      this.search.keyboard.hide();
    }
  }
}

const movieSearch = new MovieSearch();
movieSearch.init();
