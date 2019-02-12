"use strict";

/**
 * @x number required - start number from
 * @n number required - stop number
 * @fn function required - looping callback
 * @end function optional - executed while synchronous looping ended
 * @delay number optional - the delay number of interval funtion
 */
module.exports = function (x, n, fn, end, delay) {
  var task = setInterval(() => {
    if (x < n) return fn(x++);

    clearInterval(task);

    if (end) end();
  }, Number(delay) || 0);
};