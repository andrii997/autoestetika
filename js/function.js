$(document).ready(function () {
  (function () {
    // Find all video iframes on the page:
    var iframes = $("[id^=video]").find("iframe");
    // For each of them:
    for (var i = 0; i < iframes.length; i++) {
      // If "enablejsapi" is not set on the iframe's src, set it:
      if (iframes[i].src.indexOf("enablejsapi") === -1) {
        // ...check whether there is already a query string or not:
        // (ie. whether to prefix "enablejsapi" with a "?" or an "&")
        var prefix = (iframes[i].src.indexOf("?") === -1) ? "?" : "&amp;";
        iframes[i].src += prefix + "enablejsapi=true&autoplay=0&showinfo=0&controls=0&rel=0";
      }
    }

    $("a[href^='#video']").on('click', function (e) {
      var href = $(this).attr('href');
      setTimeout(function () {
        if (window.location.hash === href) {
          $(href).find('iframe')[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        }
      }, 1000);
    });
  })();

  $('#opislink1').on('click', function (e) {
    e.preventDefault();
    $(this).fadeOut();
    $('#opis1').slideDown();
  });

  $('a[href="#close"]').on('click', function (e) {
    $(this).parent().find('iframe')[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
  });

  var validateOptions = {
    onclick: false,
    onfocusout: false,
    onkeyup: false,
    errorClass: 'v-error',
    errorElement: 'div',
    errorLabelContainer: ".message",
    invalidHandler: function (event, validator) {
      $('.message').stop(true, true).hide().fadeIn(500).delay(2000).fadeOut(1000);
    },
    submitHandler: function (form) {
      $.ajax({
        url: 'feedback.php',
        type: 'POST',
        data: $(form).serialize(),
        complete: function (response) {
          if (response.responseText === "1") {
            $(form).trigger('reset');
            $(form).validate().resetForm();
            $('.message').stop(true, true).hide().html("Сообщение успешно отправлено").fadeIn(500).delay(2000).fadeOut(1000);
          }
          else
            $('.message').stop(true, true).hide().html("Произошел сбой при отправке сообщения").fadeIn(500).delay(2000).fadeOut(1000);
        }
      });
    },
    rules: {
      name: {
        required: true,
        minlength: 2,
        maxlength: 64,
      },
      phone: {
        required: true,
        minlength: 6,
        maxlength: 32,
      },
      org: {
        minlength: 2,
        maxlength: 1000,
      },
      np: {
        minlength: 6,
        maxlength: 1000,
      },
    },
    messages: {
      name: {
        required: 'Имя обязательно для заполнения',
        minlength: 'Слишком короткое имя',
        maxlength: 'Слишком длинное имя',
      },
      phone: {
        required: 'Телефон обязателен для заполнения',
        minlength: 'Введите корректный телефон',
        maxlength: 'Введите корректный телефон',
      },
      org: {
        minlength: 'Введите корректную организацию',
        maxlength: 'Введите корректную организацию',
      },
      np: {
        minlength: 'Введите корректное отделение',
        maxlength: 'Введите корректное отделение',
      },
    }
  };
  $('#contact1').validate(validateOptions);
  $('#contact2').validate(validateOptions);
  $('#contact3').validate(validateOptions);
  $('form[id^="contact"] button[type="submit"]').bind('click', function () {
    $('.message').stop(true, true).hide().html("");
  });
});
