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

/***/ "./src/no-ui-slider.js":
/*!*****************************!*\
  !*** ./src/no-ui-slider.js ***!
  \*****************************/
/***/ (() => {

eval("const initBasicSlider = () => {\r\n  // Initialize basic slider.\r\n  const slider = document.getElementById('basicSlider');\r\n  const valueMin = document.getElementById('basicSliderMin');\r\n  const valueMax = document.getElementById('basicSliderMax');\r\n\r\n  noUiSlider.create(slider, {\r\n    start: [20, 80],\r\n    connect: true,\r\n    range: {\r\n      min: 0,\r\n      max: 100\r\n    }\r\n  });\r\n\r\n  slider.noUiSlider.on('update', (values, handle) => {\r\n    if (handle)\r\n      valueMax.innerHTML = values[handle];\r\n    else\r\n      valueMin.innerHTML = values[handle];\r\n  });\r\n}\r\n\r\nconst initSmallSlider = () => {\r\n  const slider = document.getElementById('smallSlider');\r\n  noUiSlider.create(slider, {\r\n    start: [20, 80],\r\n    connect: true,\r\n    range: {\r\n      min: 0,\r\n      max: 100\r\n    }\r\n  });\r\n}\r\n\r\nconst initNormalSizeSlider = () => {\r\n  const slider = document.getElementById('normalSizeSlider');\r\n  noUiSlider.create(slider, {\r\n    start: [20, 80],\r\n    connect: true,\r\n    range: {\r\n      min: 0,\r\n      max: 100\r\n    }\r\n  });\r\n}\r\n\r\nconst initLargeSlider = () => {\r\n  const slider = document.getElementById('largeSlider');\r\n  noUiSlider.create(slider, {\r\n    start: [20, 80],\r\n    connect: true,\r\n    range: {\r\n      min: 0,\r\n      max: 100\r\n    }\r\n  });\r\n}\r\n\r\nconst initVerticalSlider = () => {\r\n  // Initialize vertical slider.\r\n  const slider = document.getElementById('verticalSlider');\r\n  noUiSlider.create(slider, {\r\n    start: [60, 160],\r\n    connect: true,\r\n    orientation: 'vertical',\r\n    range: {\r\n      min: 0,\r\n      max: 200\r\n    }\r\n  });\r\n}\r\n\r\nconst initTooltipSlider = () => {\r\n  // Initialize tooltip slider.\r\n  const slider = document.getElementById('tooltipSlider');\r\n  noUiSlider.create(slider, {\r\n    start: [20, 80, 120],\r\n    tooltips: [false, wNumb({decimals: 1}), true],\r\n    range: {\r\n      min: 0,\r\n      max: 200\r\n    }\r\n  });\r\n}\r\n\r\nconst initSoftLimitsSlider = () => {\r\n  // Initialize soft limits slider.\r\n  const slider = document.getElementById('softLimitsSlider');\r\n  noUiSlider.create(slider, {\r\n    start: [50],\r\n    range: {\r\n      min: 0,\r\n      max: 100\r\n    },\r\n    pips: {\r\n      mode: 'values',\r\n      values: [20, 80],\r\n      density: 4\r\n    }\r\n  });\r\n}\r\n\r\n// Initialize the component and set up event listeners.\r\ninitBasicSlider();\r\ninitSmallSlider();\r\ninitNormalSizeSlider();\r\ninitLargeSlider();\r\ninitVerticalSlider();\r\ninitTooltipSlider();\r\ninitSoftLimitsSlider();\n\n//# sourceURL=webpack://demo/./src/no-ui-slider.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/no-ui-slider.js"]();
/******/ 	
/******/ })()
;