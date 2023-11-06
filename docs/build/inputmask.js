/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
// Date.
Inputmask({
  mask: '99/99/9999'
}).mask('#inputmask1');

// Phone.
Inputmask({
  mask: '(999) 999-9999'
}).mask('#inputmask2');

// Placeholder.
Inputmask({
  mask: '(999) 999-9999',
  placeholder: '(999) 999-9999'
}).mask('#inputmask3');

// Repeating.
Inputmask({
  mask: '9',
  repeat: 10,
  greedy: !1
}).mask('#inputmask4');

// Right aligned.
Inputmask('decimal', {
  rightAlignNumerics: !1
}).mask('#inputmask5');

// Currency.
Inputmask('€ 999.999.999,99', {
  numericInput: !0
}).mask('#inputmask6');

// Ip address.
Inputmask({
  mask: '999.999.999.999'
}).mask('#inputmask7');

// Email address.
Inputmask({
  mask: '*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]',
  greedy: !1,
  onBeforePaste: function(a, t) {
    return (a = a.toLowerCase()).replace('mailto:', '')
  },
  definitions: {
    '*': {
      validator: '[0-9A-Za-z!#$%&"*+/=?^_`{|}~\-]',
      cardinality: 1,
      casing: 'lower'
    }
  }
}).mask('#inputmask8');
/******/ })()
;