document.addEventListener('DOMContentLoaded', () => {
  window.initCustomScroll();

  function featuresItemAnimate(item) {
    const tl = gsap.timeline();
    tl.fromTo($(item)
      .find('.features__item'), {
      y: 50,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
    });

    return tl;
  }

  gsap.utils.toArray('.features__list')
    .forEach((item) => {
      ScrollTrigger.create({
        trigger: item,
        animation: featuresItemAnimate(item),
        scroller: $(window)
          .width() > 1025 ? '[data-scroll-container]' : '',
      });
    });

  window.fnForAnimateFooter();

  const animateObj = {
    first: window.animateBg('.features__block--1'),
    second: window.animateBg('.features__block--2'),
  };

  function getDeltaForTriggerAnimate(secName) {
    let delta;

    switch (secName) {
      case 'first':
        delta = '-=100';

        if ($(window)
          .width() <= 770) {
          delta = `+=${document.documentElement.clientHeight * 1.4}`;
        }

        if ($(window)
          .width() <= 480) {
          delta = `+=${document.documentElement.clientHeight * 1.2}`;
        }

        break;
      default:
        break;
    }

    return delta;
  }

  gsap.utils.toArray('[data-section]')
    .forEach((sec) => {
      const animateName = sec.dataset.section;
      const fn = animateObj[animateName];
      let offsetScrollTriggerSec;

      if (!fn) return;

      switch (animateName) {
        case 'first':
          offsetScrollTriggerSec = getDeltaForTriggerAnimate(animateName);
          window.createScrollTrigger({
            trigger: sec,
            end: () => offsetScrollTriggerSec,
          }, fn);
          break;
        case 'second':
          window.createScrollTrigger({
            trigger: sec,
            end: () => '-=100',
          }, fn);
          break;
        default:
          break;
      }
    });
});
