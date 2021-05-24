document.addEventListener('DOMContentLoaded', () => {
  gsap.fromTo('.contacts__left', {
    y: 50,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 1
  })
  gsap.fromTo('.contacts__right', {
    y: 50,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 1
  }, 0.3) 
})
