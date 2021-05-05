@@include('./libs.js');

document.addEventListener('DOMContentLoaded', () => {
	window.initCustomScroll = function () {
		$(window).on('resize', () => {
			if($(window).width() > 1025) {
			  if(window.locoScroll) return
		
			  window.locoScroll = new LocomotiveScroll({
				el: document.querySelector("[data-scroll-container]"),
				smooth: true,
				smoothMobile: false,
				inertia: 1.1
			  });
		
			  window.locoScroll.on("scroll", ScrollTrigger.update);
		
			  ScrollTrigger.scrollerProxy("[data-scroll-container]", {
				scrollTop(value) {
				  return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
				}, // we don't have to define a scrollLeft because we're only scrolling vertically.
				getBoundingClientRect() {
				  return {
					top: 0,
					left: 0,
					width: window.innerWidth,
					height: window.innerHeight
				  };
				},
				// LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
				pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
			  });
		
			  ScrollTrigger.addEventListener("refresh", () => window.locoScroll.update());
		
			  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
			  ScrollTrigger.refresh();
		
			  setTimeout(() => {
				window.locoScroll.update()
			  }, 1000)
			}
		  }).resize()
	}

	window.animateScrollTop = function () {
		if(document.documentElement.clientWidth > 1025) {
			$('.js-btn-top').on('click', () => {
				window.locoScroll.scrollTo(0)
			})
			return
		}

        $('.js-btn-top').on('click', () => {
			$('html, body').stop().animate({scrollTop: 0}, 1000)
		})
	}

	// functions

	class Tabs {
		constructor(content, tabs, activeClass) {
			this.content = content
			this.tabs = tabs
			this.activeClass = activeClass
			this.init()
		}
	
		trigger(fn, idxFirstShowTab = 0) {
			this.tabs.each((_, item) => {
				$(item).on('click', e => {
					e.preventDefault()
	
					this.tabs.removeClass(this.activeClass)
					$(item).addClass(this.activeClass)
					this.contentShow($(item).data('tab'))

					if(!fn) return
	
					fn($(item))
				})
			})
			this.tabs.removeClass(this.activeClass)
			this.tabs.eq(idxFirstShowTab).addClass(this.activeClass)
			this.contentShow(this.showedTabInit)
		}
	
		contentShow(value) {
			if(!this.content) return

			this.content.hide()
			this.content.each((_, item) => {
				if ($(item).data('tab-content') == value) {
					$(item).fadeIn(200)
				}
			})
	
			if(window.locoScroll) window.locoScroll.update()
		}
	
		init() {
			this.trigger()
		}
	}

    function showPopupByType(type) {
        $('[data-popup]').hide()

        if(!type) return

        $(`[data-popup-name=${type}]`).show()
        $('.overlay').addClass('show')
    }

    function hidePopup() {
        $('[data-popup]').hide()
        $('.overlay').removeClass('show')
    }


	// end functions

    (function() {
	let hasThemeWhiteForHeader = false

    showPopupByType()
		new Tabs(null, $('.js-gallery__tab-wrap'), 'active')
		const currentLanguage = $('html').attr('lang')

        $('[name=phone]').each(function() {
            $(this).attr('placeholder', '+ (38) ___ - ___ - __')
            $(this).inputmask("+ (38) 999 - 999 - 99", { clearMaskOnLostFocus: false })
        })

        $('.js-open-menu').on('click', e => {
            e.preventDefault()

			if(hasThemeWhiteForHeader) $('.header').addClass('white')
			
			if($('.header').hasClass('white') && !hasThemeWhiteForHeader) {
				$('.header').removeClass('white')
				hasThemeWhiteForHeader = true
			}

            $('.header').toggleClass('show-menu')
            $('.js-menu').toggleClass('show')
        })

        $('.js-popup-open').on('click', e => {
            e.preventDefault()

            const typeName = e.currentTarget.dataset.popupType

            showPopupByType(typeName)
        })

		$(document).on('click', e => {
			if(e.target === $('.overlay')[0]) {
				hidePopup()
			}
		})

        $('.js-close-popup').on('click', e => {
            e.preventDefault()
            hidePopup()
        })

		const msgWarnObj = {
            uk: {
                email: 'Введіть коректний Email',
                phone: 'Введіть коректний номер телефону',
                warn: "Це поле обов'язкове"
            },
            ru: {
                email: 'Введите корректный Email',
                phone: 'Введите корректный номер телефона',
                warn: 'Это поле обязательное'
            },
            en: {
                email: 'Enter a valid Email',
                phone: 'Enter the correct phone number',
                warn: 'field is required'
            }
        }

        function removeFormTextWarn(input) {
			input.parent().find(".field__error-msg").remove();
		  }

		  function checkNumbers(str) {
            return str.replace(/[\W_]+/g, '')
        }

		  function removeAllFormTextWarn(inputs) {
			inputs.each(function () {
			  $(this).parent().find(".field__error-msg").remove();
			});
		  }

		  function addIndicateWarnForNode(node, classes, isAdded = true) {
			if (isAdded) {
			  $(node).closest(".field").addClass(classes);
			  return;
			}

			$(node).closest(".field").removeClass(classes);
		  }

		  function removeNodeByDelay(node, delay) {
			setTimeout(() => {
			  node.remove();
			}, delay);
		  }

		  function validateForm(inputs) {
			let isValid = true;
			inputs.each(function () {
				if(this.dataset.required) {
			  $(this).on("input", (e) => {
				if ($(e.target).val().replace(/\s+/g, "") && $(e.target).attr('name') === 'name'  && e.currentTarget.value.length <= 1) {
					const parent = $(this).parent().parent()
					parent.find('.popup__item-msg-warn').text('')
					parent.find('.popup__item-msg-warn').text(msgWarnObj[currentLanguage].warn)
					parent.addClass('warn')
				  isValid = false;
				  return;
				} else if($(e.target).attr('name') === 'phone' && checkNumbers(e.currentTarget.value).length < 8) {
					const parent = $(this).parent().parent()
					parent.find('.popup__item-msg-warn').text('')
					parent.find('.popup__item-msg-warn').text(msgWarnObj[currentLanguage].phone)
					parent.addClass('warn')
					isValid = false;
					return
				} else {
					const parent = $(this).parent().parent()
					parent.removeClass('warn')
					isValid = true;
					return
				}
			  });

				if($(this).attr('name') === 'phone' && this.value.length < 8) {
					const parent = $(this).parent().parent()
					parent.find('.popup__item-msg-warn').text(msgWarnObj[currentLanguage].phone)
					parent.addClass('warn')
					isValid = false;
					return
				}

			  if (!$(this).val().replace(/\s+/g, "")) {
				const parent = $(this).parent().parent()
				parent.find('.popup__item-msg-warn').text(msgWarnObj[currentLanguage].warn)
				parent.addClass('warn')
				isValid = false;
			  }
			}
			});

			return isValid;
		  }

		  $('form').on("submit", (e) => {
            e.preventDefault();

			let $form = $(e.currentTarget)
			const inputs = $form.find($("[name]"));
			const isValid = validateForm(inputs);

			if (isValid) {
			  sendAjaxForm("static/mail.php", $form);
			}
		  });

		  function sendAjaxForm(url, selectorForm) {
			const status = {
			  sucess: {
				  uk: "Спасибо за заявку мы с вами свяжемся в ближайшее время",
				  en: "Thank you for your application, we will contact you soon"
			  },
			  error: {
				  uk: "Ошибка на сервере повторите попытку позже",
				  en: "Error on server try again later"
			  },
			};

			const data = new FormData()

			$(selectorForm).find('input').each(function() {
				if(this.type !== 'checkbox') {
					data.append(this.name, this.value)
				} else {
					if($(this).prop('checked')) {
						data.append(this.name, this.value)
					}
				}
			})

			$.ajax({
			  url: url, //url страницы (action_ajax_form.php)
			  type: "POST", //метод отправки
			  dataType: "html", //формат данных
			  data: $(selectorForm).find('form').serialize(), // Сеарилизуем объект
			  success: function (response) {
				//Данные отправлены успешно
                $('.form__status').remove()
				$(selectorForm).append(
				  `<div class="form__status">${status.sucess[currentLanguage]}</div>`
				);
				const msg = $(selectorForm).find(".form__status");
				removeNodeByDelay(msg, 5000);
					if(selectorForm[0].tagName.toLowerCase() === 'form') {
						selectorForm[0].reset();
					} else {
						selectorForm.find('form')[0].reset();
					}
			  },
			  error: function (response) {
				// Данные не отправлены
                $('.form__status').remove()
				$(selectorForm).append(
				  `<div class="form__status">${status.error[currentLanguage]}</div>`
				);
				const msg = $(selectorForm).find(".form__status");

				removeNodeByDelay(msg, 5000);

				if(selectorForm[0].tagName.toLowerCase() === 'form') {
					selectorForm[0].reset();
				} else {
					selectorForm.find('form')[0].reset();
				}
			  },
			});
		  }
    })()
})


