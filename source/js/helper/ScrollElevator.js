/* eslint-disable no-use-before-define */
/* eslint-disable no-var */
var HelsingborgPrime = HelsingborgPrime || {};
HelsingborgPrime.Helper = HelsingborgPrime.Helper || {};

HelsingborgPrime.Helper.ScrollElevator = (function ($) {
  const elevatorSelector = '.scroll-elevator-toggle';
  // var scrollPosAdjuster = -50;
  const scrolSpeed = 500;

  function ScrollElevator() {
    if ($(elevatorSelector).length === 0) {
      return;
    }

    const $elevatorSelector = $(elevatorSelector);

    $(document).on('click', '[href="#elevator-top"]', function (e) {
      e.preventDefault();
      $(e.target).blur();

      $('html, body').animate(
        {
          scrollTop: 0,
        },
        scrolSpeed
      );
    });

    this.appendElevator($elevatorSelector);
    this.scrollSpy($elevatorSelector);
  }

  ScrollElevator.prototype.appendElevator = function ($elevatorTarget) {
    let scrollText = 'Scroll up';
    let tooltipText = '';
    let tooltipPosition = '';

    const $html = $(
      '<div class="scroll-elevator"><a href="#elevator-top"><i></i><span></span></a></div>'
    );
    if (HelsingborgPrime.Args === undefined) {
      return;
    }
    if (HelsingborgPrime.Args.get('scrollElevator.cta')) {
      scrollText = HelsingborgPrime.Args.get('scrollElevator.cta');
      $html.find('a span').html(scrollText);
    }

    if (HelsingborgPrime.Args.get('scrollElevator.tooltip')) {
      tooltipText = HelsingborgPrime.Args.get('scrollElevator.tooltip');
      $html.find('a').attr('data-tooltip', tooltipText);
    }

    if (HelsingborgPrime.Args.get('scrollElevator.tooltipPosition')) {
      tooltipPosition = HelsingborgPrime.Args.get(
        'scrollElevator.tooltipPosition'
      );
      $html.find('a').attr(tooltipPosition, '');
    }

    $html.appendTo($elevatorTarget);
  };

  // eslint-disable-next-line no-unused-vars
  ScrollElevator.prototype.scrollSpy = function ($elevatorTarget) {
    const $document = $(document);
    // var $window = $(window);

    $document.on(
      'scroll load',
      function () {
        const scrollPos = $document.scrollTop();
        if (scrollPos < 300) {
          this.hideElevator();
          return;
        }

        this.showElevator();
        return;
      }.bind(this)
    );
  };

  ScrollElevator.prototype.showElevator = function () {
    $('body').addClass('show-scroll-elevator');
    const storage = localStorage.getItem('scrollStorage');
    let preventRunningMoreThanOnce;
    if (storage) {
      $('.scroll-elevator').removeClass('minimalButtonHideRight');
      $('.scroll-elevator').addClass('minimalButtonHide');
    } else if (preventRunningMoreThanOnce) {
      $('.scroll-elevator').one(
        'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
        // eslint-disable-next-line no-unused-vars
        function (e) {
          $('.scroll-elevator').addClass('minimalButtonHideRight');
          localStorage.setItem('scrollStorage', 'true');
          preventRunningMoreThanOnce = true;
        }
      );
    }
  };

  ScrollElevator.prototype.hideElevator = function () {
    $('body').removeClass('show-scroll-elevator');
    $('.scroll-elevator').removeClass('minimalButtonHideRight');
    $('.scroll-elevator').removeClass('minimalButtonHide');
  };

  return new ScrollElevator();
})(jQuery);
