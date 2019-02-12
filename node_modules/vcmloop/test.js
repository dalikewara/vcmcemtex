"use strict";

const vcmloop = require('./app.js');

vcmloop(0, 5, (num) => {
  console.log('num = ' + num);
}, () => {
  console.log('end');
});