@@include('./libs.js');

document.addEventListener('DOMContentLoaded', () => {

	// functions

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
    showPopupByType()

		const currentLanguage = $('html').attr('lang')

        $('[name=phone]').each(function() {
            $(this).attr('placeholder', '+ (38) ___ - ___ - __')
            $(this).inputmask("+ (38) 999 - 999 - 99", { clearMaskOnLostFocus: false })
        })

        $('.js-btn-top').on('click', () => {
          $('html, body').stop().animate({scrollTop: 0}, 1000)
        })

        $('.js-open-menu').on('click', e => {
            e.preventDefault()

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


