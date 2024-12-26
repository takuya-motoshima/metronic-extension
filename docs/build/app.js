/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.css":
/*!*********************!*\
  !*** ./src/app.css ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://demo/./src/app.css?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shared_initCodeCopy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ~/shared/initCodeCopy */ \"./src/shared/initCodeCopy.js\");\n/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/app.css */ \"./src/app.css\");\n\r\n\r\n\r\n// Initialize the copy button on the code.\r\n(0,_shared_initCodeCopy__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\n//# sourceURL=webpack://demo/./src/app.js?");

/***/ }),

/***/ "./src/shared/initCodeCopy.js":
/*!************************************!*\
  !*** ./src/shared/initCodeCopy.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/**\r\n * Initialize the copy button on the code.\r\n */\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {\r\n  // Find the .highlight block.\r\n  for (let highlightBlock of document.querySelectorAll('.highlight')) {\r\n    // Find the Copy button.\r\n    const copyButton = highlightBlock.querySelector('button.highlight-copy');\r\n    if (!copyButton)\r\n      // If there is no copy button, it does nothing.\r\n      continue;\r\n\r\n    // Set up a copy event for the code on the copy button.\r\n    const clipboard = new ClipboardJS(copyButton, {\r\n      target: coppyButton => {\r\n        // Find the .highlight element.\r\n        const highlightBlock = coppyButton.closest('.highlight');\r\n\r\n        // Find the tab panel under the .highlight block.\r\n        const tabs = highlightBlock.querySelectorAll('.tab-pane');\r\n        if (tabs.length > 0) {\r\n          // If a tab panel is found, find the active tab.\r\n          const activeTab = Array.from(tabs).find(tabPanel => tabPanel.classList.contains('active'));\r\n\r\n          // Return the code element under the active tab.\r\n          return activeTab ? activeTab.querySelector('.highlight-code') : null;\r\n        } else\r\n          // If there is no tab panel, the code element under the .highlight block is returned.\r\n          return highlightBlock.querySelector('.highlight-code');\r\n      }\r\n    });\r\n    clipboard.on('success', event => {\r\n      // After copying, switch the caption of the Copy button to Copied.\r\n      const copyButton = event.trigger;\r\n      const caption = copyButton.innerHTML;\r\n      copyButton.innerHTML = 'copied';\r\n      event.clearSelection();\r\n      setTimeout(() => {\r\n        // After a certain period of time, the caption of the copy button is switched from copied to original text.\r\n        copyButton.innerHTML = caption;\r\n      }, 2000);\r\n    });\r\n  }\r\n});\n\n//# sourceURL=webpack://demo/./src/shared/initCodeCopy.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;