"use strict";

const vcmpad = require('vcmpad');
const vcmloop = require('vcmloop');

/**
 * @prm object required - data object
 * @opts object required - options
 */
module.exports = function (prm, opts) {
  if (!prm || typeof prm !== 'object') throw new Error('Invalid first argument! Object required!');
  if (opts && typeof opts !== 'object') throw new Error('Invalid second argument! Object required!');

  opts = (!opts && typeof opts !== 'object') ? {} : opts;
  opts.enter = opts.enter || false;
  opts.default = opts.default || ' ';
  opts.charlen = Number(opts.charlen) || 160;
  let attr = {
    counts: {
      detail: {}
    },
    totalData: prm.detail ? (prm.detail.data ? prm.detail.data.length : 0) : 0
  };

  function cfg (index, value, valueLen, attr, keyName, name) {
    return new Promise(resolve => {
      if (index.countFromDetail) value = attr.counts.detail[index.countFromDetail] || value;
      if (index.type === 'lps') value = vcmpad.left(valueLen, value);
      if (index.type === 'lpz') value = vcmpad.left(valueLen, value, '0');
      if (index.type === 'rps') value = vcmpad.right(valueLen, value);
      if (index.type === 'rpz') value = vcmpad.right(valueLen, value, '0');
      if (index.removeDot === true) value = value.replace(/\./g, '');
      if (index.removeSpace === true) value = value.replace(/\s+/g, '');
      if (index.decimal === false) value = Number(value) || value;
      if (name === 'detail') {
        attr.counts.detail[keyName] = attr.counts.detail[keyName] || 0;
        attr.counts.detail[keyName] += Number(value) || 0;
      }

      resolve(value);
    });
  }

  return (async function run () {
    function header () {
      return new Promise(resolve => {
        if (!prm.header) return resolve('');
        
        var keys = Object.keys(prm.header);
        var len = keys.length;
        var str = '';
        var x = 0;
        var x2 = 0;
        
        if (len < 1) return resolve('');

        for (; x < len; x++) {
          var keyName = keys[x];
          var def = prm.header[keys[x]].default || '';
          var value = (!prm.header[keys[x]].value && prm.header[keys[x]].value !== 0) ? def : prm.header[keys[x]].value.toString();

          if (prm.header[keys[x]].countFromDetail) value = attr.counts.detail[prm.header[keys[x]].countFromDetail].toString();
          if (prm.header[keys[x]].countAllData === true) value = attr.totalData.toString();

          var valueLen = Number(prm.header[keys[x]].length) || 0;

          if (!valueLen && value !== '') valueLen = value.length;

          cfg(prm.header[keys[x]], value, valueLen, attr, keyName, 'header').then(val => {
            str += val;

            if ((len - 1) === x2) resolve((!str || str === '') ? str : vcmpad.right(opts.charlen, str));

            x2++;
          });
        }
      });
    }

    function detail() {
      return new Promise(resolve => {
        if (!prm.detail) return resolve('');
        if (!prm.detail.keys || !prm.detail.data) throw new Error('Invalid format! Detail object must contains key \'keys {}\' and \'data []\'!');

        var keys = Object.keys(prm.detail.keys);
        var len = keys.length;
        var datalen = Array.isArray(prm.detail.data) ? prm.detail.data.length : 0;

        if (len < 1) return resolve('');
        if (datalen < 1) return resolve(vcmpad.right(opts.charlen, ' '));

        /*
        * Massive data will proceed into parallel chunks (4).
        * It gives faster rendering and has better performance.
        */
        if (datalen > 250000) {
          var chunkInitLen = datalen;
          var chunkInitDiv = chunkInitLen / 2;
          var chunkInitDec = chunkInitDiv % 1;
          var chunkInitFloor = Math.floor(chunkInitDiv);
          var chunkInitStart = 0;
          var chunkInitStart2 = chunkInitFloor;
          var chunkInitStart3 = (chunkInitDec === 0) ? (chunkInitLen - chunkInitFloor) : (chunkInitLen - chunkInitFloor - 1);
          var chunkInitStart4 = chunkInitLen;
          var chunkInit1 = prm.detail.data.slice(chunkInitStart, chunkInitStart2);
          var chunkInit2 = prm.detail.data.slice(chunkInitStart3, chunkInitStart4);
          // Chunk 1 & 2
          var chunk1Len = chunkInit1.length;
          var chunk1Div = chunk1Len / 2;
          var chunk1Dec = chunk1Div % 1;
          var chunk1Floor = Math.floor(chunk1Div);
          var chunk1Start = 0;
          var chunk1Start2 = chunk1Floor;
          var chunk1Start3 = (chunk1Dec === 0) ? (chunk1Len - chunk1Floor) : (chunk1Len - chunk1Floor - 1);
          var chunk1Start4 = chunk1Len;
          var chunk1 = chunkInit1.slice(chunk1Start, chunk1Start2);
          var chunk2 = chunkInit1.slice(chunk1Start3, chunk1Start4);
          // Chunk 3 & 4
          var chunk3Len = chunkInit2.length;
          var chunk3Div = chunk3Len / 2;
          var chunk3Dec = chunk3Div % 1;
          var chunk3Floor = Math.floor(chunk3Div);
          var chunk3Start = 0;
          var chunk3Start2 = chunk3Floor;
          var chunk3Start3 = (chunk3Dec === 0) ? (chunk3Len - chunk3Floor) : (chunk3Len - chunk3Floor - 1);
          var chunk3Start4 = chunk3Len;
          var chunk3 = chunkInit2.slice(chunk3Start, chunk3Start2);
          var chunk4 = chunkInit2.slice(chunk3Start3, chunk3Start4);

          (async function () {
            function chunk (ch) {
              return new Promise(resolve => {
                var chlen = ch.length;
                var x = 0;
                var x2 = 0;
                var str = '';

                if (chlen < 1) resolve('');

                vcmloop(x, chlen, num => {
                  var y = 0;
                  var y2 = 0;
                  var s = '';

                  for ( ;y < len; y++) {
                    var keyName = keys[y];
                    var def = prm.detail.keys[keys[y]].default || '';
                    var value = (!ch[num][keys[y]] && ch[num][keys[y]] !== 0) ? def : ch[num][keys[y]].toString();
                    var valueLen = Number(prm.detail.keys[keys[y]].length) || 0;

                    if (!valueLen && value !== '') valueLen = value.length;
                    
                    cfg(prm.detail.keys[keys[y]], value, valueLen, attr, keyName, 'detail').then(val => {
                      s += val;
                      attr.counts.detail[keys[x]] = attr.counts.detail[keys[x]] || 0;
                      attr.counts.detail[keys[x]] += Number(val) || 0;

                      if ((len - 1) === y2) {
                        s = (!s || s === '') ? s : vcmpad.right(opts.charlen, s);
                        s = (!s || s === '') ? s : s + '\n';
                        str += s;

                        if ((chlen - 1) === x2) resolve(str);

                        x2++;
                      }

                      y2++;
                    });
                  }
                });
              });
            }

            let [ch1, ch2, ch3, ch4] = await Promise.all([chunk(chunk1), chunk(chunk2), chunk(chunk3), chunk(chunk4)]);

            resolve(ch1 + ch2 + ch3 + ch4);
          })();
        } else {
          var chlen = prm.detail.data.length;
          var x = 0;
          var x2 = 0;
          var str = '';

          if (chlen < 1) resolve('');

          vcmloop(x, chlen, num => {
            var y = 0;
            var y2 = 0;
            var s = '';

            for (; y < len; y++) {
              var keyName = keys[y];
              var def = prm.detail.keys[keys[y]].default || '';
              var value = (!prm.detail.data[num][keys[y]] && prm.detail.data[num][keys[y]] !== 0) ? def : prm.detail.data[num][keys[y]].toString();
              var valueLen = Number(prm.detail.keys[keys[y]].length) || 0;

              if (!valueLen && value !== '') valueLen = value.length;

              cfg(prm.detail.keys[keys[y]], value, valueLen, attr, keyName, 'detail').then(val => {
                s += val;

                if ((len - 1) === y2) {
                  s = (!s || s === '') ? s : vcmpad.right(opts.charlen, s);
                  s = (!s || s === '') ? s : s + '\n';
                  str += s;
                  
                  if ((chlen - 1) === x2) resolve(str);

                  x2++;
                }

                y2++;
              });
            }
          });
        }
      });
    }

    function footer() {
      return new Promise(resolve => {
        if (!prm.footer) return resolve('');

        var keys = Object.keys(prm.footer);
        var len = keys.length;
        var str = '';
        var x = 0;
        var x2 = 0;

        if (len < 1) return resolve('');

        for (; x < len; x++) {
          var keyName = keys[x];
          var def = prm.footer[keys[x]].default || '';
          var value = (!prm.footer[keys[x]].value && prm.footer[keys[x]].value !== 0) ? def : prm.footer[keys[x]].value.toString();

          if (prm.footer[keys[x]].countFromDetail) value = attr.counts.detail[prm.footer[keys[x]].countFromDetail].toString();
          if (prm.footer[keys[x]].countAllData === true) value = attr.totalData.toString();

          var valueLen = Number(prm.footer[keys[x]].length) || 0;

          if (!valueLen && value !== '') valueLen = value.length;

          cfg(prm.footer[keys[x]], value, valueLen, attr, keyName, 'footer').then(val => {
            str += val;

            if ((len - 1) === x2) resolve((!str || str === '') ? str : vcmpad.right(opts.charlen, str));

            x2++;
          });
        }
      });
    }

    let dtl = await detail();
    let hdr = await header();
    let ftr = await footer();
    hdr = (hdr !== '') ? ((opts.enter === true) ? hdr + '\n' : hdr) : hdr;
    ftr = (ftr !== '') ? ((opts.enter === true) ? ftr + '\n' : ftr) : ftr;

    return hdr + dtl + ftr;
  }());
};