//
// @name Cookie consent
//
HelsingborgPrime = HelsingborgPrime || {};
HelsingborgPrime.Prompt = HelsingborgPrime.Prompt || {};

HelsingborgPrime.Prompt.CookieConsent = (function ($) {

    var animationSpeed = 1000;

    function CookieConsent() {
        this.init();
    }

    CookieConsent.prototype.init = function () {
        var showCookieConsent = (HelsingborgPrime.Args.get('cookieConsent.show')) ? HelsingborgPrime.Args.get('cookieConsent.show') : true;

        if (showCookieConsent && !this.hasAccepted()) {
            this.displayConsent();

            $(document).on('click', '[data-action="cookie-consent"]', function (e) {
                e.preventDefault();
                var btn = $(e.target).closest('button');
                this.accept();
            }.bind(this));
        }
    };

    CookieConsent.prototype.displayConsent = function() {
        var wrapper = $('body');
        if ($('#wrapper:first-child').length > 0) {
            wrapper = $('#wrapper:first-child');
        }

        var consentText = 'This website uses cookies to ensure you get the best experience browsing the website.';
        if (HelsingborgPrime.Args.get('cookieConsent.message')) {
            consentText = HelsingborgPrime.Args.get('cookieConsent.message');
        }

        var buttonText = 'Got it';
        if (HelsingborgPrime.Args.get('cookieConsent.button')) {
            buttonText = HelsingborgPrime.Args.get('cookieConsent.button');
        }

        var placement = HelsingborgPrime.Args.get('cookieConsent.placement') ? HelsingborgPrime.Args.get('cookieConsent.placement') : null;

        wrapper.prepend('\
            <div id="cookie-consent" class="notice info gutter gutter-vertical ' + placement + '" style="display:none;">\
                <div class="container"><div class="grid grid-table-md grid-va-middle">\
                    <div class="grid-col-icon"><i class="fa fa-info-circle"></i></div>\
                    <div class="grid-md-9">' + consentText + '</div>\
                    <div class="grid-md-3 text-right-md text-right-lg"><button class="btn btn-primary" data-action="cookie-consent">' + buttonText + '</button></div>\
                </div></div>\
            </div>\
        ');

        $('#cookie-consent').show();
    };

    CookieConsent.prototype.hasAccepted = function() {
        return HelsingborgPrime.Helper.Cookie.check('cookie-consent', true);
    };

    CookieConsent.prototype.accept = function() {
        $('#cookie-consent').remove();
        HelsingborgPrime.Helper.Cookie.set('cookie-consent', true, 60);
    };

    return new CookieConsent();

})(jQuery);