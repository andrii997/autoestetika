function animateNumbers(el, to, timeMiliSec) {
	$({
		n: parseInt(el.html())
	}).animate({
		n: parseInt(to)
	}, {
		duration: timeMiliSec,
		step:     function (a) {
			el.html(a | 0)
		}
	});
}

$(document).ready(function () {
	var validateOptions = {
		onclick:             false,
		onfocusout:          false,
		onkeyup:             false,
		errorClass:          'v-error',
		errorElement:        'div',
		errorLabelContainer: ".message",
		invalidHandler:      function (event, validator) {
			$('.message').stop(true, true).hide().fadeIn(500).delay(2000).fadeOut(1000);
		},
		submitHandler:       function (form) {
			$.ajax({
				url:      'feedback.php',
				type:     'POST',
				data:     $(form).serialize(),
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
		rules:               {
			name:    {
				required:  true,
				minlength: 2,
				maxlength: 64,
			},
			email:   {
				email:     true,
				//required:  true,
				minlength: 6,
				maxlength: 32,
			},
			phone:   {
				required:  true,
				minlength: 6,
				maxlength: 32,
			},
			comment: {
				//required:  true,
				minlength: 6,
				maxlength: 1000,
			},
		},
		messages:            {
			name:    {
				required:  'Имя обязательно для заполнения',
				minlength: 'Слишком короткое имя',
				maxlength: 'Слишком длинное имя',
			},
			email:   {
				email:     'Введите корректный email',
				required:  'EMail обязателен для заполнения',
				minlength: 'Введите корректный email',
				maxlength: 'Введите корректный email',
			},
			phone:   {
				required:  'Телефон обязателен для заполнения',
				minlength: 'Введите корректный телефон',
				maxlength: 'Введите корректный телефон',
			},
			comment: {
				required:  'Введите корректный комментарий или вопрос',
				minlength: 'Слишком короткий комментарий или вопрос',
				maxlength: 'Слишком длинный комментарий или вопрос',
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
