document.addEventListener('DOMContentLoaded', () => {
  window.initCustomScroll()

  function featuresItemAnimate(item) {
    const tl = gsap.timeline()
    tl.fromTo($(item).find('.features__item'), {
      y: 50,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1
    })

    return tl
  }

  gsap.utils.toArray('.features__list').forEach((item) => {
    ScrollTrigger.create({
      trigger: item,
      animation: featuresItemAnimate(item),
      scroller: $(window).width() > 1025 ? "[data-scroll-container]" : '',
    })
  })

  window.fnForAnimateFooter()

  const animateObj = {
    first: window.animateBg('.features__block--1'),
    second: window.animateBg('.features__block--2'),
  }

  gsap.utils.toArray('[data-section]').forEach((sec) => {
    const animateName = sec.dataset.section
    const fn = animateObj[animateName]

    if (!fn) return

    switch (animateName) {
      case 'first':
        window.createScrollTrigger({
          trigger: sec,
          end: () => '-=100'
        }, fn)
        break
      case 'second':
        window.createScrollTrigger({
          trigger: sec,
          end: () => '-=100'
        }, fn)
        break
    }
  })
})
