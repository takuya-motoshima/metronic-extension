/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/inputmask.js":
/*!**************************!*\
  !*** ./src/inputmask.js ***!
  \**************************/
/***/ (() => {

eval("// Date.\r\nInputmask({\r\n  mask: '99/99/9999'\r\n}).mask('#inputmask1');\r\n\r\n// Phone.\r\nInputmask({\r\n  mask: '(999) 999-9999'\r\n}).mask('#inputmask2');\r\n\r\n// Placeholder.\r\nInputmask({\r\n  mask: '(999) 999-9999',\r\n  placeholder: '(999) 999-9999'\r\n}).mask('#inputmask3');\r\n\r\n// Repeating.\r\nInputmask({\r\n  mask: '9',\r\n  repeat: 10,\r\n  greedy: !1\r\n}).mask('#inputmask4');\r\n\r\n// Right aligned.\r\nInputmask('decimal', {\r\n  rightAlignNumerics: !1\r\n}).mask('#inputmask5');\r\n\r\n// Currency.\r\nInputmask('€ 999.999.999,99', {\r\n  numericInput: !0\r\n}).mask('#inputmask6');\r\n\r\n// Ip address.\r\nInputmask({\r\n  mask: '999.999.999.999'\r\n}).mask('#inputmask7');\r\n\r\n// Email address.\r\nInputmask({\r\n  mask: '*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]',\r\n  greedy: !1,\r\n  onBeforePaste: function(a, t) {\r\n    return (a = a.toLowerCase()).replace('mailto:', '')\r\n  },\r\n  definitions: {\r\n    '*': {\r\n      validator: '[0-9A-Za-z!#$%&\"*+/=?^_`{|}~\\-]',\r\n      cardinality: 1,\r\n      casing: 'lower'\r\n    }\r\n  }\r\n}).mask('#inputmask8');\n\n//# sourceURL=webpack://demo/./src/inputmask.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/inputmask.js"]();
/******/ 	
/******/ })()
;