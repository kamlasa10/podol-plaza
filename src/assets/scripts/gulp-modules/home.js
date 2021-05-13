document.addEventListener('DOMContentLoaded', () => {
  window.initCustomScroll()
  window.animateScrollTop()
  const heroSwiper = new Swiper('.js-hero-slider', {
    speed: 700,
    pagination: {
      el: '.hero__slider-pagination',
      type: 'bullets',
      clickable: true
    },
    autoplay: {
      delay: 5000,
    },
    on: {
      init(e) {
        setTimeout(() => {
          const { bullets } = e.pagination
          const cirlceProgress = `
						<svg class="js-hero-progress-slider" height="100" width="100">
            <circle cx="17" cy="23" r="16" stroke="#fff" stroke-width="1" fill="transparent" />
           </svg>
							`

          bullets.forEach((item, i) => {
            item.insertAdjacentHTML('afterbegin', cirlceProgress)
          })

          $('.js-hero-progress-slider')[0].classList.add('start-animate')
        })
      },
    }
  })

  heroSwiper.on('transitionStart', (e) => {
    e.pagination.bullets.forEach((item) => {
      $(item).find('.js-hero-progress-slider').removeClass('start-animate')
    })
  })

  heroSwiper.on('transitionEnd', (e) => {
    $('.swiper-pagination-bullet-active .js-hero-progress-slider').addClass('start-animate')
  })

  const swiperFeatures = new Swiper('.js-feature-slider', {
    spaceBetween: 30,
    slidesPerView: 4.3,
    navigation: {
      nextEl: '.js-controls-features-slider-next',
      prevEl: '.js-controls-features-slider-prev',
    },
  })

  const swiperTeam = new Swiper('.js-team-slider', {
    spaceBetween: 40,
    slidesPerView: 5.2,
    navigation: {
      nextEl: '.js-controls-team-slider-next',
      prevEl: '.js-controls-team-slider-prev',
    },
    breakpoints: {
      1440: {
        slidesPerView: 5.2,
      },
      1250: {
        slidesPerView: 4.2,
        spaceBetween: 30
      },
      1020: {
        slidesPerView: 3.2,
        spaceBetween: 25
      }
    }
  })

  const animateObj = {}

  function createScrollTrigger(opts, fn, scrub = true) {
    ScrollTrigger.create({
      scrub,
      animation: fn(),
      ...opts,
      scroller: $(window).width() > 1025 ? "[data-scroll-container]" : ''
    })
  }
})
