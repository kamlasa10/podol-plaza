document.addEventListener('DOMContentLoaded', () => {
  window.initCustomScroll()

  const msnry = new Masonry('.video__list', {
    itemSelector: '.video__item',
    percentPosition: true,
  });
})
