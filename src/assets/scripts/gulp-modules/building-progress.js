document.addEventListener('DOMContentLoaded', () => {
  function setDashoffsetCircle(el) {
    return 2 * Math.PI * el.getAttribute("r");
  }

  function simulatePathDrawing(path, fillPercentage = 10, strokeWidth) {
    if (path.done) return;
    path.style.strokeDasharray = 0;
    path.style.strokeDashoffset = 0;
    // var path = document.querySelector('.squiggle-animated path');
    const length = setDashoffsetCircle(path);
    path.style.transition = path.style.WebkitTransition = "none";
    path.style.fill = "none";
    path.style.strokeDashoffset = "0";
    path.style.transition = path.style.WebkitTransition = "stroke-dashoffset 1.5s ease";
    // Set up the starting positions
    path.style.strokeDasharray = `${length * (fillPercentage / 100)} ${length}`;
    path.style.strokeDashoffset = length + length * (fillPercentage / 100);
    path.style.transformOrigin = `center`;
    // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating
    path.style.strokeWidth = strokeWidth;
    path.done = true;
  }

  $('.js-bulding-progress-report').each(function () {
    this.addEventListener('click', (e) => {
      e.preventDefault()

      initGallery()
    })
  })

  function initSlider() {
    const $nodeTotallides = document.querySelector('.js-gallery__slider-info .gallery__slider-info-total')
    const $nodeCurrentSlide = document.querySelector('.js-gallery__slider-info .gallery__slider-info-current')

    const BuldingGallery = new Swiper('.js-bulding-gallery-slider', {
      speed: 700,
      loop: true,
      navigation: {
        nextEl: '.js-controls-building-next',
        prevEl: '.js-controls-building-prev',
      },
      on: {
        init(e) {
          $nodeCurrentSlide.textContent = '1/'
          $nodeTotallides.textContent = e.slides.length - 2
        },
        slideChange(e) {
          let currentSlideNum = e.activeIndex
            
          if (!e.activeIndex) {
            currentSlideNum = e.slides.length - 2
          } else if (e.activeIndex > e.slides.length - 2) {
            currentSlideNum = 1
          }
            
          $nodeCurrentSlide.textContent = `${currentSlideNum}/`
        }
      }
    })
  }

  function destoryGallery() {
    initGallery(true)
  }

  function initGallery(destory = false) {
    const $nodeHeader = $('.header')
    const $nodeLogo = $nodeHeader.find('.header__logo img')

    $nodeHeader.toggleClass('white show-gallery')

    if (destory) {
      $nodeLogo.attr('src', 'assets/images/footer-logo.svg')
    } else {
      $nodeLogo.attr('src', 'assets/images/logo-white.svg')
    }

    $('.building-gallery').toggleClass('show')
    initSlider()
  }

  new window.Tabs(null, $('.js-building-progress__tab-wrap'), 'active')

  $('.js-gallery-close').on('click', (e) => {
    e.preventDefault()

    destoryGallery()
  })

  Array.from(document.querySelectorAll("[data-progress]")).forEach(
    (item) => {
      const icon = item.querySelector(".data-progress-circle");
      const percent = item.dataset.progress;

      simulatePathDrawing(icon, percent);
    }
  );
})
