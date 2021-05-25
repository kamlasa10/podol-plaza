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

  function animateTextBlock(nodeSelector) {
    const tl = gsap.timeline()

    tl.fromTo(nodeSelector, {
      y: 80,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1.2
    })

    return tl
  }

  function animateSection1() {
    const tl = gsap.timeline()

    tl.fromTo('.complex-name__bg', {
      scale: 1.3
    }, {
      scale: 1
    })

    tl.fromTo('.complex-name__wrap', {
        y: 150,
      }, {
        y: 0,
      }, 0.1)

    return tl
  }

  function animateSection2() {
    return animateTextBlock('.about-complex__content')
  }

  function animateSection3() {
    const tl = gsap.timeline()

    tl.fromTo('.panorama img', {
      scale: 1.3
    }, {
      scale: 1
    })

    return tl
  }

  function animateSection4() {
    return animateTextBlock('.about-complex__content')
  }

  function animateSection5() {
    const tl = gsap.timeline()

    tl.fromTo('.floor .complex-name__bg', {
      scale: 1.3
    }, {
      scale: 1
    })

    return tl
  }
  
  function animateSection6() {
    const tl = gsap.timeline()

    tl.fromTo('.features__top', {
      y: -40,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1
    })
    .fromTo('.features__item', {
      y: 40,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1.3,
      stagger: 0.2
    }, 0.1)

    return tl
  }

  function animateSection7() {
    const tl = gsap.timeline()

    tl.fromTo('.office-block .complex-name__bg', {
      scale: 1.3
    }, {
      scale: 1
    })

    return tl
  }

  function animateSection8() {
    const tl = gsap.timeline()

    tl.fromTo('.parking .complex-name__bg', {
      scale: 1.3
    }, {
      scale: 1
    })

    return tl
  }

  function animateSection9() {
    const tl = gsap.timeline()

    tl.fromTo('.builder__left', {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      duration: 1,
      y: 0
    })
    .fromTo('.builder__right', {
      y: -30,
      opacity: 0
    }, {
      y: 0,
      duration: 1,
      opacity: 1
    }, 0.3)

    return tl
  }

  function animateSection10() {
    const tl = gsap.timeline()

    tl.fromTo('.object__decor', {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      duration: 1,
      y: 0
    })
    .fromTo('.objects__title', {
      y: 30,
      opacity: 0
    }, {
      y: 0,
      duration: 1,
      opacity: 1
    }, 0.3)
    .fromTo('.objects__item', {
      y: 25,
      opacity: 0,
    }, {
      stagger: 0.15,
      y: 0,
      duration: 1,
      opacity: 1
    }, 0)

    return tl
  }

  function animateSection11() {
    const tl = gsap.timeline()

    tl.fromTo('.features__top', {
      y: -30,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1
    })
    .fromTo('.team__item', {
      y: 30,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.2
    })

    return tl
  }

  function animateSection12() {
    const tl = gsap.timeline()

    tl.fromTo('.contacts__title', {
      y: -30,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1
    })
    .fromTo('.contacts__left', {
      y: 50,
      opacity: 0
    }, {
      y: 0,
      opacity: 1
    }, 0)
    .fromTo('.contacts__right', {
      y: 50,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1
    }, 0.3)

    return tl
  }

  const animateObj = {
    first: animateSection1,
    second: animateSection2,
    three: animateSection3,
    four: animateSection4,
    five: animateSection5,
    six: animateSection6,
    seven: animateSection7,
    eight: animateSection8,
    nine: animateSection9,
    ten: animateSection10,
    eleven: animateSection11,
    twelve: animateSection12
  }

  if(document.documentElement.clientWidth > 1025) {
    gsap.utils.toArray('[data-section]').forEach(sec => {
      const animateName = sec.dataset.section
      const fn = animateObj[animateName]
  
      switch(animateName) {
        case 'first':
          createScrollTrigger({
            trigger: sec,
          }, fn)
          break
        case 'second': 
          createScrollTrigger({
            trigger: sec,
          }, fn, false)
          break
        case 'three':
          createScrollTrigger({
            trigger: sec,
            end: () => `+=${document.documentElement.clientHeight}`
          }, fn)
          break
        case 'four':
          createScrollTrigger({
            trigger: sec,
          }, fn, false)
          break
        case 'five':
          createScrollTrigger({
            trigger: sec,
            end: () => `+=${document.documentElement.clientWidth / 1.6}`,
          }, fn)
          break
        case 'six':
          createScrollTrigger({
            trigger: sec,
          }, fn, false)
          break
          case 'seven':
            createScrollTrigger({
              trigger: sec,
              end: () => `+=${document.documentElement.clientWidth / 2.5}`,
            }, fn)
            break
          case 'eight':
            createScrollTrigger({
              trigger: sec,
              markers: true,
              end: () => `+=${document.documentElement.clientWidth / 2.5}`,
            }, fn)
            break
          case 'nine':
            createScrollTrigger({
              trigger: sec,
            }, fn, false)
            break
          case 'ten':
            createScrollTrigger({
              trigger: sec,
            }, fn, false)
            break
            case 'eleven':
              createScrollTrigger({
                trigger: sec,
              }, fn, false)
              break
            case 'twelve':
              createScrollTrigger({
                trigger: sec,
              }, fn, false)
              break
      }
    })
  }

  function createScrollTrigger(opts, fn, scrub = true) {
    ScrollTrigger.create({
      scrub,
      animation: fn(),
      immediateRender: scrub && false,
      ...opts,
      scroller: $(window).width() > 1025 ? "[data-scroll-container]" : '',
    })
  }
})
