document.addEventListener('DOMContentLoaded', () => {
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
          console.log(bullets)
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
})
