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

/***/ "./src/indicator.js":
/*!**************************!*\
  !*** ./src/indicator.js ***!
  \**************************/
/***/ (() => {

eval("// Handle button click event.\r\ndocument.getElementById('button1').addEventListener('click', event => {\r\n  // Element to indecate.\r\n  const button = event.currentTarget;\r\n\r\n  // Activate indicator.\r\n  button.setAttribute('data-kt-indicator', 'on');\r\n\r\n  // Disable indicator after 3 seconds.\r\n  setTimeout(function() {\r\n    button.removeAttribute('data-kt-indicator');\r\n  }, 3000);\r\n});\r\n\r\n// Handle button click event.\r\ndocument.getElementById('button2').addEventListener('click', event => {\r\n  // Element to indecate.\r\n  const button = event.currentTarget;\r\n\r\n  // Activate indicator.\r\n  button.setAttribute('data-kt-indicator', 'on');\r\n\r\n  // Disable indicator after 3 seconds.\r\n  setTimeout(function() {\r\n    button.removeAttribute('data-kt-indicator');\r\n  }, 3000);\r\n});\r\n\r\n// Handle button click event.\r\ndocument.getElementById('button3').addEventListener('click', event => {\r\n  // Element to indecate.\r\n  const button = event.currentTarget;\r\n\r\n  // Activate indicator.\r\n  button.setAttribute('data-kt-indicator', 'on');\r\n\r\n  // Disable indicator after 3 seconds.\r\n  setTimeout(function() {\r\n    button.removeAttribute('data-kt-indicator');\r\n  }, 3000);\r\n});\n\n//# sourceURL=webpack://demo/./src/indicator.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/indicator.js"]();
/******/ 	
/******/ })()
;