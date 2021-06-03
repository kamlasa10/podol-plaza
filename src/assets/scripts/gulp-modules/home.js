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
    autoHeight: true,
    slidesPerView: 3.9,
    breakpoints: {
      320: {
        slidesPerView: 1.1,
        spaceBetween: 10
      },
      480: {
        slidesPerView: 1.4,
        spaceBetween: 15
      },
      650: {
        slidesPerView: 2.2,
        spaceBetween: 20,
      },
      850: {
        spaceBetween: 30,
        slidesPerView: 3.3
      },
      1200: {
        slidesPerView: 4.3
      },
      1650: {
        slidesPerView: 4.3
      }
    },
    navigation: {
      nextEl: '.js-controls-features-slider-next',
      prevEl: '.js-controls-features-slider-prev',
    },
    on: {
      init(e) {
        if($(window).width() <= 1370) {
          console.log(e)
        }
      }
    }
  })

  const swiperTeam = new Swiper('.js-team-slider', {
    spaceBetween: 40,
    slidesPerView: 5.2,
    navigation: {
      nextEl: '.js-controls-team-slider-next',
      prevEl: '.js-controls-team-slider-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1.3,
        spaceBetween: 15
      },
      667: {
        slidesPerView: 2,
        spaceBetween: 25
      },
      770: {
        slidesPerView: 3,
        spaceBetween: 25,
      },
      1000: {
        slidesPerView: 3.1,
        spaceBetween: 20,
      },
      1250: {
        slidesPerView: 'auto',
        spaceBetween: 30
      },
      1440: {
        slidesPerView: 4.7
      },
      1650: {
        slidesPerView: 4.8
      },
      1700: {
        slidesPerView: 5.2,
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
    return animateTextBlock('.about-complex-info .about-complex__content')
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

  function getAdaptiveHeightTriggerForAnimateScroll(secName) {
    let offsetScroll

    switch (secName) {
      case 'five':
        offsetScroll = document.documentElement.clientWidth / 1.6

        if ($(window).width() <= 1025) {
          offsetScroll = document.documentElement.clientWidth / 1.3
        }

        if ($(window).width() <= 770) {
          offsetScroll = document.documentElement.clientWidth / 1
        }

        if ($(window).width() <= 480) {
          offsetScroll = document.documentElement.clientWidth * 1.4
        }

        break;
      case 'seven':
      case 'eight':
        offsetScroll = document.documentElement.clientWidth / 2.5

        if ($(window).width() < 1025) {
          offsetScroll = document.documentElement.clientWidth / 1.5
        }

        if ($(window).width() <= 770) {
          offsetScroll = document.documentElement.clientWidth / 1
        }

        if ($(window).width() <= 480) {
          offsetScroll = document.documentElement.clientWidth * 1.4
        }

      default:
        break;
    }

    return offsetScroll
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

  gsap.utils.toArray('[data-section]').forEach((sec) => {
    const animateName = sec.dataset.section
    const fn = animateObj[animateName]
    let offsetScrollTriggerSec
  
    switch (animateName) {
      case 'first':
        window.createScrollTrigger({
          trigger: sec,
        }, fn)
        break
      case 'second': 
        window.createScrollTrigger({
          trigger: sec,
        }, fn, false)
        break
      case 'three':
        window.createScrollTrigger({
          trigger: sec,
          end: () => `+=${document.documentElement.clientHeight}`
        }, fn)
        break
      case 'four':
        window.createScrollTrigger({
          trigger: sec,
        }, fn, false)
        break
      case 'five':
        offsetScrollTriggerSec = getAdaptiveHeightTriggerForAnimateScroll(animateName)
        window.createScrollTrigger({
          trigger: sec,
          end: () => `+=${offsetScrollTriggerSec}`,
        }, fn)
        break
      case 'six':
        window.createScrollTrigger({
          trigger: sec,
        }, fn, false)
        break
      case 'seven':
        offsetScrollTriggerSec = getAdaptiveHeightTriggerForAnimateScroll(animateName)
        window.createScrollTrigger({
          trigger: sec,
          end: () => `+=${offsetScrollTriggerSec}`,
        }, fn)
        break
      case 'eight':
        offsetScrollTriggerSec = getAdaptiveHeightTriggerForAnimateScroll(animateName)
        window.createScrollTrigger({
          trigger: sec,
          markers: true,
          end: () => `+=${offsetScrollTriggerSec}`,
        }, fn)
        break
      case 'nine':
        window.createScrollTrigger({
          trigger: sec,
        }, fn, false)
        break
      case 'ten':
        window.createScrollTrigger({
          trigger: sec,
        }, fn, false)
        break
      case 'eleven':
        window.createScrollTrigger({
          trigger: sec,
        }, fn, false)
        break
      case 'twelve':
        window.createScrollTrigger({
          trigger: sec,
        }, fn, false)
        break
    }
  })
})
