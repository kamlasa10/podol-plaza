@@include('./libs.js');

document.addEventListener('DOMContentLoaded', () => {
  $('.preloader')
    .hide();

  $('.ReactModal__Overlay')
    .hide();

  window.animateBg = function (blockName) {
    return () => {
      const tl = gsap.timeline();
      tl.fromTo(`${blockName} .complex-name__bg`, {
        scale: 1.3,
      }, {
        scale: 1,
      });

      return tl;
    };
  };

  window.createScrollTrigger = function (opts, fn, scrub = true) {
    ScrollTrigger.create({
      scrub,
      animation: fn(),
      immediateRender: scrub && false,
      ...opts,
      scroller: $(window)
        .width() > 1025 ? '[data-scroll-container]' : '',
    });
  };

  window.initCustomScroll = function (needSmothScroll = true) {
    $(window)
      .on('resize', () => {
        if ($(window)
          .width() > 1025 && needSmothScroll) {
          if (window.locoScroll) return;

          window.locoScroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            smoothMobile: false,
            inertia: 1.1,
          });

          window.locoScroll.on('scroll', (e) => {
            console.log('update');
            ScrollTrigger.update(e);
          });

          ScrollTrigger.scrollerProxy('[data-scroll-container]', {
            scrollTop(value) {
              return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
            }, // we don't have to define a scrollLeft because we're only scrolling vertically.
            getBoundingClientRect() {
              return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
              };
            },
            // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
            pinType: document.querySelector('[data-scroll-container]').style.transform ? 'transform' : 'fixed',
          });

          ScrollTrigger.addEventListener('refresh', () => window.locoScroll.update());

          // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
          ScrollTrigger.refresh();

          setTimeout(() => {
            window.locoScroll.update();
          }, 1000);
        }
      })
      .resize();

    window.fnForAnimateFooter = function () {
      function animateFooter() {
        const tl = gsap.timeline();

        tl.fromTo('.footer', {
          y: 50,
          opacity: 0,
        }, {
          y: 0,
          opacity: 1,
          duration: 1,
        });

        return tl;
      }

      ScrollTrigger.create({
        trigger: $('.footer'),
        animation: animateFooter(),
        scroller: $(window)
          .width() > 1025 ? '[data-scroll-container]' : '',
      });
    };

    window.fnForAnimateFooter();

    const $header = $('.header');

    function animateScroll(offset) {
      if (offset > 10) {
        $header.addClass('move');
      } else {
        $header.removeClass('move');
      }
    }

    if (window.locoScroll) {
      window.locoScroll.on('scroll', e => {
        animateScroll(e.scroll.y);
      });

      return;
    }

    window.addEventListener('scroll', e => {
      animateScroll(window.pageYOffset);
    });
  };

  window.animateScrollTop = function () {
    if (document.documentElement.clientWidth > 1025 && window.locoScroll) {
      $('.js-btn-top')
        .on('click', () => {
          window.locoScroll.scrollTo(0);
        });
      return;
    }

    $('.js-btn-top')
      .on('click', () => {
        $('html, body')
          .stop()
          .animate({ scrollTop: 0 }, 1000);
      });
  };

  $('.animate-link')
    .each(function () {
      $(this)
        .on('click', e => {
          e.preventDefault();
          const hash = $(this)
            .attr('href');
          if (window.locoScroll) {
            const el = $(hash)[0];
            window.locoScroll.scrollTo(el);
            return;
          }

          $('html,body')
            .animate({
              scrollTop: $(hash)
                .offset().top,
            });
        });
    });

  // functions

  window.Tabs = class Tabs {
    constructor(content, tabs, activeClass) {
      this.content = content;
      this.tabs = tabs;
      this.activeClass = activeClass;
      this.init();
    }

    trigger(fn, idxFirstShowTab = 0) {
      this.tabs.each((_, item) => {
        $(item)
          .on('click', e => {
            e.preventDefault();

            this.tabs.removeClass(this.activeClass);
            $(item)
              .addClass(this.activeClass);
            this.contentShow($(item)
              .data('tab'));

            if (!fn) return;

            fn($(item));
          });
      });
      this.tabs.removeClass(this.activeClass);
      this.tabs.eq(idxFirstShowTab)
        .addClass(this.activeClass);
      this.contentShow(this.showedTabInit);
    }

    contentShow(value) {
      if (!this.content) return;

      this.content.hide();
      this.content.each((_, item) => {
        if ($(item)
          .data('tab-content') == value) {
          $(item)
            .fadeIn(200);
        }
      });

      if (window.locoScroll) window.locoScroll.update();
    }

    init() {
      this.trigger();
    }
  };

  function showPopupByType(type) {
    $('[data-popup]')
      .hide();

    if (!type) return;

    $(`[data-popup-name=${type}]`)
      .show();
    $('.overlay')
      .addClass('show');
  }

  function hidePopup() {
    $('[data-popup]')
      .hide();
    $('.overlay')
      .removeClass('show');
  }


  // end functions

  (function () {
    let hasThemeWhiteForHeader = false;

    const hideCustomCursor = (isOpenMenu) => {
      try {
        if (isOpenMenu) {
          $('.js-gallery__slider-info')
            .hide();
        } else {
          $('.js-gallery__slider-info')
            .css('display', 'flex');
        }
      } catch (e) {
      }
    };

    showPopupByType();
    new window.Tabs(null, $('.js-gallery__tab-wrap'), 'active');
    const currentLanguage = $('html')
      .attr('lang');
    const footerPhone = $('.js-footer-input');
    let menuTl;

    $('[name=phone]')
      .each(function () {
        $(this)
          .attr('placeholder', '+ (38) ___ - ___ - __');
        $(this)
          .inputmask('+ (38) 999 - 999 - 99', { clearMaskOnLostFocus: false });
      });

    footerPhone.attr('placeholder', '___ - ___ - __');
    footerPhone.inputmask('999 - 999 - 99', { clearMaskOnLostFocus: false });

    $('.js-open-menu')
      .on('click', e => {
        e.preventDefault();
        const $logo = $('.header__logo img')[0];
        menuTl = gsap.timeline();

        gsap.fromTo('.nav__menu-decor', {
          width: 0,
        }, {
          width: '100%',
          duration: 1.6,
        });

        menuTl.fromTo('.nav__left', {
          y: 35,
          opacity: 0,
        }, {
          opacity: 1,
          y: 0,
          duration: 1,
        })
          .fromTo('.nav__right-block', {
            y: 35,
            opacity: 0,
          }, {
            stagger: 0.2,
            y: 0,
            opacity: 1,
            duration: 1,
          }, 0);

        if (hasThemeWhiteForHeader) {
          $logo.src = './wp-content/themes/podolplaza/assets/images/logo-white.svg';
          $('.header')
            .addClass('white');
          hasThemeWhiteForHeader = false;
        } else if ($('.header')
          .hasClass('white') && !hasThemeWhiteForHeader) {
          $('.header')
            .removeClass('white');
          $logo.src = './wp-content/themes/podolplaza/assets/images/logo.svg';
          hasThemeWhiteForHeader = true;
        }

        hideCustomCursor($('.header')
          .hasClass('show-menu'));

        if ($('.header')
          .hasClass('show-menu')) {
          menuTl.clear();
          $('.burger-btn__text')
            .text('Меню');

          if (window.locoScroll) {
            window.locoScroll.start();
          } else {
            document.body.style.overflow = 'visible';
          }
        } else {
          if (window.locoScroll) {
            window.locoScroll.stop();
          } else {
            document.body.style.overflow = 'hidden';
          }
          $('.burger-btn__text')
            .text('Закрити');
        }

        $('.header')
          .toggleClass('show-menu');
        $('.js-menu')
          .toggleClass('show');
      });

    $('.js-popup-open')
      .on('click', e => {
        e.preventDefault();

        const typeName = e.currentTarget.dataset.popupType;

        showPopupByType(typeName);
      });

    $(document)
      .on('click', e => {
        if (e.target === $('.overlay')[0]) {
          hidePopup();
          menuTl.clear();
        }
      });

    $('.js-close-popup')
      .on('click', e => {
        e.preventDefault();
        hidePopup();
      });

    const msgWarnObj = {
      ua: {
        email: 'Введіть коректний Email',
        phone: 'телефон повинен містити не менше 8 символів',
        warn: 'Це поле обов\'язкове',
      },
      ru: {
        email: 'Введите корректный Email',
        phone: 'телефон повинен містити не менше 8 символів',
        warn: 'Это поле обязательное',
      },
      en: {
        email: 'Enter a valid Email',
        phone: 'Phone must have not less 8 symbol',
        warn: 'field is required',
      },
    };

    function removeFormTextWarn(input) {
      input.parent()
        .find('.field__error-msg')
        .remove();
    }

    function checkNumbers(str) {
      return str.replace(/[\W_]+/g, '');
    }

    function removeAllFormTextWarn(inputs) {
      inputs.each(function () {
        $(this)
          .parent()
          .find('.field__error-msg')
          .remove();
      });
    }

    function addIndicateWarnForNode(node, classes, isAdded = true) {
      if (isAdded) {
        $(node)
          .closest('.field')
          .addClass(classes);
        return;
      }

      $(node)
        .closest('.field')
        .removeClass(classes);
    }

    function removeNodeByDelay(node, delay) {
      setTimeout(() => {
        node.remove();
      }, delay);
    }

    function validateForm(inputs) {
      let isValid = true;
      inputs.each(function () {
        if (this.dataset.required) {
          $(this)
            .on('input', (e) => {
              if ($(e.target)
                .val()
                .replace(/\s+/g, '') && $(e.target)
                .attr('name') === 'name' && e.currentTarget.value.length <= 1) {
                const parent = $(this)
                  .parent()
                  .parent();
                parent.find('.popup__item-msg-warn')
                  .text('');
                parent.find('.popup__item-msg-warn')
                  .text(msgWarnObj[currentLanguage].warn);
                parent.addClass('warn');
                isValid = false;
                return;
              } else if ($(e.target)
                .attr('name') === 'phone' && checkNumbers(e.currentTarget.value).length < 8) {
                const parent = $(this)
                  .parent()
                  .parent();
                parent.find('.popup__item-msg-warn')
                  .text('');
                parent.find('.popup__item-msg-warn')
                  .text(msgWarnObj[currentLanguage].phone);
                parent.addClass('warn');
                isValid = false;
                return;
              } else {
                const parent = $(this)
                  .parent()
                  .parent();
                parent.removeClass('warn');
                isValid = true;
                return;
              }
            });

          if ($(this)
            .attr('name') === 'phone' && this.value.length < 8) {
            const parent = $(this)
              .parent()
              .parent();
            parent.find('.popup__item-msg-warn')
              .text(msgWarnObj[currentLanguage].phone);
            parent.addClass('warn');
            isValid = false;
            return;
          }

          if (!$(this)
            .val()
            .replace(/\s+/g, '')) {
            const parent = $(this)
              .parent()
              .parent();
            parent.find('.popup__item-msg-warn')
              .text(msgWarnObj[currentLanguage].warn);
            parent.addClass('warn');
            isValid = false;
          }
        }
      });

      return isValid;
    }

    $('form')
      .on('submit', (e) => {
        e.preventDefault();

        let $form = $(e.currentTarget);
        const inputs = $form.find($('[name]'));
        const isValid = validateForm(inputs);

        if (isValid) {
          sendAjaxForm('static/mail.php', $form);
        }
      });

    function sendAjaxForm(url, selectorForm) {
      const status = {
        sucess: {
          ua: 'Спасибо за заявку мы с вами свяжемся в ближайшее время',
          en: 'Thank you for your application, we will contact you soon',
        },
        error: {
          ua: 'Ошибка на сервере повторите попытку позже',
          en: 'Error on server try again later',
        },
      };

      const data = new FormData();

      $(selectorForm).find('input').each(function () {
        if (this.type !== 'checkbox') {
          data.append(this.name, this.value)
        } else {
          if ($(this).prop('checked')) {
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
          if (selectorForm[0].tagName.toLowerCase() === 'form') {
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

          if (selectorForm[0].tagName.toLowerCase() === 'form') {
            selectorForm[0].reset();
          } else {
            selectorForm.find('form')[0].reset();
          }
        },
      });
    }

    // adaptive

    $(window).on('resize', () => {

      if($(window).width() < 965) {
        $('.js-nav__menu-laptop').append($('.js-nav-item-laptop'))
        $('.nav__top').append($('.js-nav__menu-laptop'))
      } else {
        $('.nav__right').append($('.js-nav-item-laptop'))
      }

      if($(window).width() < 480) {
        $('.js-footer__nav-mobile').append($('.js-mobile-position'))
      } else {
        $('.footer__top-right').append($('.js-mobile-position'))
      }
    }).resize()
  })();
});


