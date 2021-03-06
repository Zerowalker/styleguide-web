/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-empty-function */
//
// @name Language
//
HelsingborgPrime = HelsingborgPrime || {};

HelsingborgPrime.Args = (function ($) {
  function Args() {}

  Args.prototype.get = function (s) {
    if (typeof HbgPrimeArgs === 'undefined') {
      return false;
    }

    let o = HbgPrimeArgs;

    s = s.replace(/\[(\w+)\]/g, '.$1');
    s = s.replace(/^\./, '');

    const a = s.split('.');
    for (let i = 0, n = a.length; i < n; ++i) {
      const k = a[i];

      if (k in o) {
        o = o[k];
      } else {
        return false;
      }
    }

    return o;
  };

  return new Args();
})(jQuery);
