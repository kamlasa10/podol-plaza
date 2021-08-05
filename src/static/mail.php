<?
/* if(isset($_GET['type'])){
$webAd = 'Этаж:'.$flat['floor'].', квартира:'.$flat['type_front'];	
}
else { $webAd = $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; } */
$webAd = $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
?>
<div class="callback-form">
    <div class="callback-form__container">
        <div class="callback-form__close-btn">
            <div class="callback-form__close-image">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21L1 1M1 21L21 1L1 21Z" stroke="#405174"/>
                </svg>
            </div>
            <!-- <div><?_e('contacts-form-Закрити','o2');?></div> -->
        </div>
        <div>
            <p class="callback-form__heading heading"><?_e('contacts-form-Замовити телефонний дзвінок','o2');?></p>
            <p class="callback-form__subheading">Ми проконсультуємо вас по вартості та плануванням</p>
        </div>
        <div>
            <form id="callback-form" autocomplete="off">
                <div class="callback-form-tabs">
                    <button type="button" class="callback-form-tab" data-callback-type="callback">Замовити дзвінок</button>
                    <button type="button" class="callback-form-tab" data-callback-type="writeMsg">Написати нам</button>
                </div>
                <div class="callback-input callback-input_name js-input-name-container">
                    <input class="input-field input-field_name js-input-name" type="text" name="name" onkeyup="javascript:countme('callback-form');"  placeholder="<?_e('contacts-form-Ваше ім`я:','o2');?>" data-required="true">
                    <div class="validation-error validation-error_required" style="display: none"><?_e('contacts-form-Данне поле обов`язкове для заповнення','o2');?></div>
                </div>
                <div data-callback-content="callback">
                    <div class="callback-input callback-input_phone js-input-phone-container">
                        <input class="input-field input-field_phone js-input-phone" type="tel" name="phone" placeholder="<?_e('contacts-form-Ваш телефон:','o2');?>" data-required="false">
                        <div class="validation-error validation-error_required" style="display: none"><?_e('contacts-form-Данне поле обов`язкове для заповнення','o2');?></div>
                        <div class="validation-error validation-error_phone-format" style="display: none"><?_e('contacts-form-Невірний формат телефону','o2');?></div>
                    </div>
                    <div class="callback-input callback-input_timedate js-input-timedate-container mainForm__input">
                        <input class="input-field datetimepicker_dark" type="text"  name="timedate" placeholder="<?_e('contacts-form-Ми зателефонуємо у зручний для вас час','o2');?>">
                    </div>
                </div>
                <div class="callback-form__phone-mail-wrapper">
                    <div data-callback-content="writeMsg">
                                           <!--  <span class="callback-form__text">Або</span> -->
                    <div class="callback-input callback-input_mail js-input-mail-container">
                        <input class="input-field input-field_mail js-input-mail" type="text" name="phone" placeholder="Ваш email" data-required="false">
                        <div class="validation-error validation-error_required" style="display: none"><?_e('contacts-form-Данне поле обов`язкове для заповнення','o2');?></div>
                        <div class="validation-error validation-error_phone-format" style="display: none"><?_e('contacts-form-Невірний формат телефону','o2');?></div>
                    </div>

                    <div class="callback-input callback-input_message js-input-message-container">
                        <textarea class="textarea textarea_message js-input-message" name="message" placeholder="<?_e('contacts-form-Ваше питання:','o2');?>"></textarea>
                    </div>
                <!-- Календарь выпадайка,-->
                    </div>
                </div>
                <!-- Конец Календарь выпадайка-->
                <input  name="typ" class="webad" type="hidden" value="0" >
                <input  name="webad" class="webad" type="hidden" value="<?=$webAd;?>"/>
				<input  name="ref" class="ref" type="hidden" value="<?=$ref;?>"/>
                <input  name="metka" class="metka" type="hidden" value="Замовити дзвінок - o2"/>
                <input  name="inn" class="userInn" type="hidden" value="o2"/>
                <div class="callback-input callback-input_submit">
                    <input class="submit_btn" type="submit" value="<?_e('form-submit','o2');?>">
                </div>
            </form>
        </div>
    </div>
</div>

<div class="modal modal-success">
    <div class="modal__close-btn">
        <img src="<?php bloginfo('template_url'); ?>/assets/img/common/close_icon.svg" alt="Close Form Button">
    </div>
    <div>
        <p><?_e('contacts-form-Ваше повідомлення відправлено','o2');?></p>
        <p><?_e('contacts-form-Наші менеджери звяжуться з Вами','o2');?></p>
    </div>
</div>

<script src="/wp-content/themes/o2/assets/js/php-date-formatter.min.js" >
</script>
<script src="/wp-content/themes/o2/assets/js/datetimepicker.js" >
</script>
<link rel="stylesheet"  href="/wp-content/themes/o2/assets/css/datetimepicker.css" type="text/css" media="all">
<script>
var mainForm = function () {
    $('.mainForm__input').on('focus', function () {
      $(this).parent().addClass('input-focus-js');
    }).blur(function () {
      if ($(this).val() === '') {
        $(this).parent().removeClass('input-focus-js');
      }
    });
}
 var dataInput = function () {
    $.datetimepicker.setLocale('ru');
    var logic1 = function (currentDateTime) {
      if (currentDateTime.getDate() == new Date().getDate()) {
        this.setOptions({
          minTime: new Date()
        });
      } else {
        this.setOptions({
          minTime: '9:00'
        });
      }
    };

    $('.datetimepicker_dark').datetimepicker({
      //            theme:'dark',
      // value: 'trololo',
      // value: new Date(),
      minDate: new Date(),
      maxTime: '20:00',
      yearStart: 2019,
      yearEnd: 2019,
      dayOfWeekStart: 1,
      onSelectDate: logic1,
      onShow: logic1

    });
  };
  mainForm();
  dataInput();
</script>



<div class="callback-form  js-presentation-form" style="display:none">
    <div class="callback-form__container">
        <div class="callback-form__close-btn mfp-close">
            <div class="callback-form__close-image">
                <img src="<?php bloginfo('template_url'); ?>/assets/img/common/close_icon.svg" alt="Close Form Button">
            </div>
        </div>
        <div>
            <p class="callback-form__heading heading"><?_e('Завантажити презентацію','o2');?></p>
        </div>
        <div>
            <form id="presentation-form" autocomplete="off" data-url="<?php bloginfo('template_url'); ?>/assets/files/o2_booklet_web_compressed.pdf">
                <div class="callback-input callback-input_name js-input-name-container">
                    <input class="input-field input-field_name js-input-name" type="text" name="name" onkeyup="javascript:countme('presentation-form');"  placeholder="<?_e('contacts-form-Ваше ім`я:','o2');?>" data-required="true">
                    <div class="validation-error validation-error_required" style="display: none"><?_e('contacts-form-Данне поле обов`язкове для заповнення','o2');?></div>
                </div>
                <div class="callback-input callback-input_phone js-input-phone-container">
                    <input class="input-field input-field_phone js-input-phone" type="tel" name="phone" placeholder="<?_e('contacts-form-Ваш телефон:','o2');?>" data-required="false">
                    <div class="validation-error validation-error_required" style="display: none"><?_e('contacts-form-Данне поле обов`язкове для заповнення','o2');?></div>
                    <div class="validation-error validation-error_phone-format" style="display: none"><?_e('contacts-form-Невірний формат телефону','o2');?></div>
                </div>
                <div class="callback-input callback-input_message js-input-message-container">
                    <textarea class="textarea textarea_message js-input-message" name="message" placeholder="<?_e('contacts-form-Ваше питання:','o2');?>"></textarea>
                </div>
                <!-- Календарь выпадайка,-->
               <!-- <div class="callback-input callback-input_timedate js-input-timedate-container mainForm__input">
                    <input class="input-field datetimepicker_dark" type="text"  name="timedate" placeholder="<?_e('contacts-form-Ми зателефонуємо у зручний для вас час','o2');?>">
                </div>-->
                <!-- Конец Календарь выпадайка-->
                <input  name="typ" class="webad" type="hidden" value="0" >
                <input  name="webad" class="webad" type="hidden" value="<?=$webAd;?>"/>
				<input  name="ref" class="ref" type="hidden" value="<?=$ref;?>"/>
                <input  name="metka" class="metka" type="hidden" value="Завантажити презентацію- o2"/>
                <input  name="inn" class="userInn" type="hidden" value="o2"/>
                <div class="callback-input callback-input_submit">
                    <input class="submit_btn" type="submit" value="<?_e('form-submit','o2');?>">
                </div>
            </form>
        </div>
    </div>
</div>