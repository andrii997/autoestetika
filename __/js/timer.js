;(function($) {
  var units = {
      en: ['Days', 'Hours', 'Minutes', 'Seconds'],
      ru: ['дней', 'часов', 'минут', 'секунд'],
      ua: ['днів', 'годин', 'хвилин', 'секунд'],
      sec: [86400, 3600, 60, 1]
    },
    defaults = {
      etType: 1,
      etDate: '0',
      etTitleText: '',
      etShowSign: 1,
      etSep: ':',
      etLastUnit: 4,
    };

  $.fn.eTimer = function(options) {
    var config = $.extend({}, defaults, options);

    return this.each(function() {
      var element = $(this),
        date = config.etDate,
        dayNum = 2;

      element.date = function() {
        var now = new Date();
        if (config.etType == 1) {
          date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        } else if (config.etType == 2) {
          var day = now.getDay();
          if (day == 0) day = 7;
          date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8 - day);
        } else if (config.etType == 3) {
          date = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        } else {
          date = date.split('.');
          date = new Date(date[2], date[1] - 1, date[0], date[3], date[4]);
          if (Math.floor((date - now) / units.sec[0] / 1000) >= 100) dayNum = 3;
        }
      };

      element.layout = function() {
        var unit,
          elClass = element.attr('class').split(' ')[0];
        element.html('').addClass('eTimer').append('<div class="etTitle">' + config.etTitleText + '</div>');
        $.each(units.en, function(i) {
          if (i < config.etLastUnit) {
            unit = $('<div class="etUnit et' + this + '"></div>').appendTo(element).append('<div class="etNumber">0</div>').append('<div class="etNumber">0</div>').after('<div class="etSep">' + config.etSep + '</div>');
            if (i == 0 && dayNum == 3) unit.append('<div class="etNumber">0</div>');
          }
        });
       element.append('<style type="text/css">.' + elClass + ' .etSep:last-of-type {display: none;} + ;}</style>');
      };

      element.tick = function() {
        var timeLeft = Math.floor((date - new Date()) / 1000),
          unit;
        if (timeLeft < 0) clearInterval(element.data('interval'));
        else {
          $.each(units.en, function(i) {
            if (i < config.etLastUnit) {
              unit = Math.floor(timeLeft / units.sec[i]);
              timeLeft -= unit * units.sec[i];
              if (i == 0 && dayNum == 3) {
                element.find('.et' + this).find('.etNumber').eq(0).text(Math.floor(unit / 100) % 10);
                element.find('.et' + this).find('.etNumber').eq(1).text(Math.floor(unit / 10) % 10);
                element.find('.et' + this).find('.etNumber').eq(2).text(unit % 10);
                if ((Math.floor(unit / 100) % 10) == 0) {
                  dayNum = 2;
                  element.find('.et' + this).find('.etNumber').eq(0).remove();
                }
              } else {
                element.find('.et' + this).find('.etNumber').eq(0).text(Math.floor(unit / 10) % 10);
                element.find('.et' + this).find('.etNumber').eq(1).text(unit % 10);
              }
            }
          });
        }
      };

      clearInterval(element.data('interval'));
      element.date();
      element.layout();
      element.tick();
      element.data('interval', setInterval(function() {
        element.tick()
      }, 1000));
    });
  };
})(jQuery);