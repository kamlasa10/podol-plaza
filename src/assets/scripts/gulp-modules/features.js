document.addEventListener('DOMContentLoaded', () => {
    window.initCustomScroll()

    function animateItem() {
      const tl = gsap.timeline()

      gsap.from('.features__item', {
        y: 50,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
      })

      return tl
    }

    const animateObj = {
        first: window.animateBg('.features__block--1'),
        second: window.animateBg('.features__block--2'),
        three: animateItem,
        four: animateItem,
        five: animateItem
    }

    gsap.utils.toArray('[data-section]').forEach(sec => {
        const animateName = sec.dataset.section
        const fn = animateObj[animateName]
        console.log(sec)
    
        switch(animateName) {
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
          case 'three': 
          window.createScrollTrigger({
            trigger: sec,
            markers: true
          }, fn, false)
          break
          case 'four': 
          window.createScrollTrigger({
            trigger: sec,
          }, fn, false)
          break
          case 'five': 
          window.createScrollTrigger({
            trigger: sec,
          }, fn, false)
        }
      })
})