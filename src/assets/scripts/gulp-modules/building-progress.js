document.addEventListener('DOMContentLoaded', () => {
  function setDashoffsetCircle(el) {
    return 2 * Math.PI * el.getAttribute("r");
  }

  window.initCustomScroll()

  function simulatePathDrawing(path, fillPercentage = 10, strokeWidth) {
    if (path.done) return;
    path.style.strokeDasharray = 0;
    path.style.strokeDashoffset = 0;
    // var path = document.querySelector('.squiggle-animated path');
    const length = setDashoffsetCircle(path);
    path.style.transition = path.style.WebkitTransition = "none";
    path.style.fill = "none";
    path.style.strokeDashoffset = "0";
    path.style.transition = path.style.WebkitTransition = "stroke-dashoffset 1.5s ease";
    // Set up the starting positions
    path.style.strokeDasharray = `${length * (fillPercentage / 100)} ${length}`;
    path.style.strokeDashoffset = length + length * (fillPercentage / 100);
    path.style.transformOrigin = `center`;
    // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating
    path.style.strokeWidth = strokeWidth;
    path.done = true;
  }
  const progressItemsAll = [...document.querySelectorAll('.js-bulding-progress-report')]

  let buldingGallerySlider
  const currentShowHome = document.body.dataset.buildPage
  let progressItems = 
  	progressItemsAll
  	.filter(item => item.dataset.build === currentShowHome)
  let progressItemsCopy = [...progressItems]
  const COUNT_SHOW_PROGRESS_ITEMS_DEFAULT = 2
  let currentShowGalleryIdx = 0

  $(progressItemsAll).hide()

  function findIdxEl(el) {
  	return progressItemsCopy.findIndex(item => item === el)
  }

  function startLoadingImgByChangeCountItems() {
  	progressItems = progressItems.filter((item, i) => {
  		if(i < COUNT_SHOW_PROGRESS_ITEMS_DEFAULT) {
  			const img = item.querySelector('img')

  			img.src = img.dataset.srs
  			$(item).fadeIn(200)
  			return
  		}

  		return item
  	})

  	if(!progressItems.length) {
  		$('.js-loading-more').hide()
  	}

  	window.locoScroll.update()
  }

  startLoadingImgByChangeCountItems() 

  function createGalleryItems(imgs) {
  	let fragment = ''

  	imgs.forEach(imgUrl => {
  		fragment += `
  			<div class="swiper-slide building-gallery__item">
  				<img src=${imgUrl} alt="photo" />
  			</div>
  		`
  	})

  	return fragment
  }

  function initSlider(galleryImgs) {
    const $nodeTotallides = document.querySelector('.js-gallery__slider-info .gallery__slider-info-total')
    const $nodeCurrentSlide = document.querySelector('.js-gallery__slider-info .gallery__slider-info-current')
    
    $('.js-bulding-gallery-slider .swiper-wrapper').html()
    $('.js-bulding-gallery-slider .swiper-wrapper').html(createGalleryItems(galleryImgs))

    buldingGallerySlider = new Swiper('.js-bulding-gallery-slider', {
      speed: 700,
      loop: true,
      navigation: {
        nextEl: '.js-controls-building-next',
        prevEl: '.js-controls-building-prev',
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
  }

  function setDisabledNode(node, attr) {
  	console.log(node.data(attr))
  	if(node.data(attr) <= 0) {
 		node.addClass('disabled')
 		return
  	} 

  	node.removeClass('disabled')
  }

  function setGalleryInfo({date, text, next, prev}) {
  	const galleryPrev = $('[data-gallery-prev]')
  	const galleryNext = $('[data-gallery-next]')

  	$('.building-gallery__date small-text').text(`${date}`)
  	$('.building-gallery__month').text(`${text}`)
  	galleryNext.attr('data-gallery-next', next)
  	galleryPrev.attr('data-gallery-prev', prev)

  	galleryPrev.removeClass('disabled')
  	galleryNext.removeClass('disabled')

  	if(!currentShowGalleryIdx) {
  		galleryPrev.addClass('disabled')
  	}

  	if(currentShowGalleryIdx + 1 >= progressItemsCopy.length) {
  		galleryNext.addClass('disabled')
  	}

  	// setDisabledNode(galleryPrev, 'gallery-prev')
  	// setDisabledNode(galleryNext, 'gallery-next')
  }

  function createGallery(data) {
  	const {
  		slider, text, date,
  		next, prev
  	} = data

  	
  	setGalleryInfo({date, text, next, prev})
  	initGallery(false, slider)
  }

  function fetchData(data, fn) {
  		// fetch('/wp-admin/admin-ajax.php', {
  		// 	method: 'POST',
  		// 	body: data,
  		// 	 headers: {
  		// 	 	'Accept': 'application/json',
    //   			'Content-Type': 'application/json'
    // 		},
  		// }).then(res => console.log(res))

        $.ajax({
            type: "post",
            url: "/wp-admin/admin-ajax.php",
            data: data,
            dataType: "json",
            beforeSend: function () { // Before we send the request, remove the .hidden class from the spinner and default to inline-block.
				$('.preloader').addClass('loading-data')
				$('.preloader').fadeIn(200)
			},
            success: function(data) {
            	if(!fn) {
            		return
            	}

            	disabledScroll(true)

            	$('.preloader').removeClass('loading-data')
            	$('.preloader').fadeOut(200)
                fn(data);
            },
            error: function(data) {
            	console.log(data)
                console.warn(data);
            },
        });
}

function disabledScroll(disabled) {
	if(window.locoScroll) {
		if(disabled) {
			window.locoScroll.stop()
			return
		}

		window.locoScroll.start()
	}
}

$('.js-loading-more').on('click', e => {
	e.preventDefault()

	startLoadingImgByChangeCountItems()
})

$('.js-bulding-progress-report').on('click', e => {
	e.preventDefault()
	const postId = e.currentTarget.dataset.galletyId
	const idPrev = e.currentTarget.dataset.prev || ''
	const idNext = e.currentTarget.dataset.next || ''

	currentShowGalleryIdx = findIdxEl(e.currentTarget)
	fetchData(`action=progress&id=${postId}&next=${idNext}&prev=${idPrev}`, createGallery)
})

$('.js-gallery__tab-wrap').on('click', e => {
	destoryGallery()
	currentShowGalleryIdx = e.currentTarget.dataset.direction === 'next' ? currentShowGalleryIdx + 1 : currentShowGalleryIdx - 1
	const postId = progressItemsCopy[currentShowGalleryIdx].dataset.galletyId

	fetchData(`action=progress&id=${postId}`, createGallery)
})

  function destoryGallery() {
    initGallery(true)
    buldingGallerySlider.destroy(true, true)
  }

  function initGallery(destory = false, sliderImgs) {
    const $nodeHeader = $('.header')
    const $nodeLogo = $nodeHeader.find('.header__logo img')

    $nodeHeader.toggleClass('white show-gallery')

    $('.building-gallery').toggleClass('show')
    $('.building-gallery').toggleClass('js-gallery')
    addListenerMouseTargetForNode($('.building-gallery__top'), objWithMethodForEventMouse)

    if (destory) {
      $nodeLogo.attr('src', '/wp-content/themes/podolplaza/assets/images/logo.svg')
      return
    } else {
      $nodeLogo.attr('src', '/wp-content/themes/podolplaza/assets/images/logo-white.svg')
    }

    initSlider(sliderImgs)
  }

  $('.js-gallery-close').on('click', (e) => {
    e.preventDefault()

   	disabledScroll(false)
    destoryGallery()
  })

  Array.from(document.querySelectorAll("[data-progress]")).forEach(
    (item) => {
      const icon = item.querySelector(".data-progress-circle");
      const percent = item.dataset.progress;

      simulatePathDrawing(icon, percent);
    }
  );
})
