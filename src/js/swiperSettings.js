const swiperSettings = {
  preloadImages: false,
  lazy: true,
  watchSlidesVisibility: true,
  loadPrevNextAmount: 10,
  centeredSlides: false,
  spaceBetween: 15,
  direction: 'horizontal',
  slidesPerView: 1,
  loop: false,
  observer: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    830: {
      slidesPerView: 4,
    },
    640: {
      slidesPerView: 3,
    },
    480: {
      slidesPerView: 2,
    },
  },
  centerInsufficientSlides: true,
};

export default swiperSettings;
