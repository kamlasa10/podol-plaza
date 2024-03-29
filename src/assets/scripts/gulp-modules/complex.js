document.addEventListener('DOMContentLoaded', () => {
  window.initCustomScroll()

  function animateSec2() {
    const tl = gsap.timeline()

    tl.fromTo('.architecture__left', {
      y: 40,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1
    })
      .fromTo('.architecture__right', {
        x: 50,
        opacity: 0
      }, {
        x: 0,
        opacity: 1,
        duration: 1
      }, 0)

    return tl
  }

  const animateObj = {
    first: window.animateBg('.intro'),
    second: animateSec2,
    three: window.animateBg('.complex-desc')
  }

  window.fnForAnimateFooter()

  gsap.utils.toArray('[data-section]').forEach((sec) => {
    const animateName = sec.dataset.section
    const fn = animateObj[animateName]

    switch (animateName) {
      case 'first':
      case 'three':
        window.createScrollTrigger({
          trigger: sec,
          start: () => '-=350',
          end: () => ($(window).width() >= 480 ? '+=300' : `+=${document.documentElement.clientHeight}`),
          markers: true,
        }, fn)
        break
      case 'second':
        window.createScrollTrigger({
          trigger: sec,
          start: () => ($(window).width() >= 480 ? '-=500' : '-=350'),
        }, fn, false)
    }
  })
})
