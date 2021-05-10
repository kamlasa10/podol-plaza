document.addEventListener('DOMContentLoaded', () => {
  const $nodeTotallides = document.querySelector('.js-gallery__slider-info .gallery__slider-info-total')
  const $nodeCurrentSlide = document.querySelector('.js-gallery__slider-info .gallery__slider-info-current')
  
  const gallerySwiper = new Swiper('.js-gallery-slider', {
    speed: 700,
    loop: true,
    slidesPerView: 1,
    navigation: {
      prevEl: '.gallery__controls-btn-left',
      nextEl: '.gallery__controls-btn-right',
    },

    on: {
      init(e) {
        $nodeCurrentSlide.textContent = '1/'
        $nodeTotallides.textContent = e.slides.length - 2
      },
      slideChange(e) {
        let currentSlideNum = e.activeIndex

        if (!e.activeIndex) {
          currentSlideNum = e.slides.length - 2
        } else if (e.activeIndex > e.slides.length - 2) {
          currentSlideNum = 1
        }

        $nodeCurrentSlide.textContent = `${currentSlideNum}/`
      }
    }
  })

  function stopMoveInCursor(e) {
    e.stopPropagation()
    $('.js-gallery').css({ cursor: 'default' })
    $('.js-gallery__slider-info').css({ opacity: 0 })
    
    isGallery = false
    document.onmousemove = null,
    document.onClick = null
    console.log('rip onClick')
  }

  const prevCoord = document.documentElement.clientWidth / 1.8
  let currentCord
  let isFirstForGallery = false

  function startMoveInCursor(e) {
    const customCursor = $('.js-gallery__slider-info')
    let directionName = ''
        
    $('.js-gallery').css({ cursor: 'none' })

    $('.js-gallery__slider-info').css({ opacity: 1, display: 'flex' })

    if (e.originalEvent.clientX > prevCoord) {
      directionName = 'right'
      $('.js-gallery__slider-info').addClass('.gallery__controls-btn-right')
    } else {
      directionName = 'left'
    }
    
    document.onmousemove = function (e) {
      customCursor.css({ transform: `translate(${e.offsetX - 10}px, ${e.offsetY - 10}px)` })

      if (prevCoord < e.clientX) {
        if (isFirstForGallery) {
          customCursor.addClass('gallery__controls-btn-right-cursor')
          directionName = 'right'
          isFirstForGallery = false
        }
      } else if (prevCoord > e.clientX) {
        if (!isFirstForGallery) {
          customCursor.removeClass('gallery__controls-btn-right-cursor')
          directionName = 'left'
          isFirstForGallery = true
        }
      }
    }

    document.onClick = function () {
      console.log('click')
    }
  }

  function addListenerMouseTargetForNode($node, objWithMethod = {}) {
    if (!$node || !Object.keys(objWithMethod).length) {
      throw new Error('you cant use method without required params')
    }

    const { stopMoveInCursor, startMoveInCursor } = objWithMethod

    if ($node === $('.js-gallery')[0]) {
      $node.on('mouseenter', startMoveInCursor)
      $node.on('mouseout', stopMoveInCursor)
      return
    }

    $node.on('mouseenter', stopMoveInCursor)
    $node.on('mouseleave', startMoveInCursor)
  }

  const objWithMethodForEventMouse = {
    startMoveInCursor, 
    stopMoveInCursor
  }

  addListenerMouseTargetForNode($('.js-gallery'), objWithMethodForEventMouse)
  addListenerMouseTargetForNode($('.header'), objWithMethodForEventMouse)
  addListenerMouseTargetForNode($('.js-gallery__controls'), objWithMethodForEventMouse)
  addListenerMouseTargetForNode($('.gallery__wrapper-top'), objWithMethodForEventMouse)
  addListenerMouseTargetForNode($('.gallery__tabs'), objWithMethodForEventMouse)
  $('.footer').on('mouseenter', stopMoveInCursor)
})
