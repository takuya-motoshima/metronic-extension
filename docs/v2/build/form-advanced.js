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

/***/ "./src/pages/form-advanced.js":
/*!************************************!*\
  !*** ./src/pages/form-advanced.js ***!
  \************************************/
/***/ (() => {

eval("function initClipboardButton() {\r\n  // Copy button and the element to be copied.\r\n  const button = document.getElementById('copy');\r\n  const input = document.getElementById('input');\r\n\r\n  // Initialize clipboard.\r\n  const clipboard = new ClipboardJS(button);\r\n\r\n  // Copy text to clipboard. For more info check the plugin's documentation: https://clipboardjs.com/.\r\n  clipboard.on('success', evnt => {\r\n    // Save the current caption of the button.\r\n    const caption = button.innerHTML;\r\n    \r\n    //　Change the style of the input element being copied.\r\n    input.classList.add('bg-success');\r\n    input.classList.add('text-inverse-success');\r\n\r\n    // Copy button caption to \"copied\".\r\n    button.innerHTML = 'Copied!';\r\n\r\n    // After a certain time, the input element's style and button caption are restored to the way they were before copying.\r\n    setTimeout(() => {\r\n      button.innerHTML = caption;\r\n      input.classList.remove('bg-success');\r\n      input.classList.remove('text-inverse-success');\r\n    }, 3000);\r\n\r\n    // Deselects the input element.\r\n    evnt.clearSelection();\r\n  });\r\n}\r\n\r\nfunction initInteractiveButton() {\r\n  // Initialize Interactive Button.\r\n  const options = document.querySelectorAll('[data-dvanced-forms=\"interactive\"]');\r\n  const input = document.querySelector('[name=\"amount\"]');\r\n\r\n  // The value selected in the button group is reflected in the input element.\r\n  options.forEach(option => {\r\n    option.addEventListener('click', evnt => {\r\n      evnt.preventDefault();\r\n      input.value = evnt.target.innerText;\r\n    });\r\n  });\r\n}\r\n\r\nfunction initInteractiveSlider() {\r\n  // Initialize Interactive Slider.\r\n  var slider = document.getElementById('slider');\r\n  var label = document.getElementById('sliderLabel');\r\n  noUiSlider.create(slider, {\r\n    start: [5],\r\n    connect: true,\r\n    range: {\r\n      min: 1,\r\n      max: 500\r\n    }\r\n  });\r\n\r\n  slider.noUiSlider.on(\"update\", (values, handle) => {\r\n    label.innerHTML = Math.round(values[handle]);\r\n    if (handle)\r\n      label.innerHTML = Math.round(values[handle]);\r\n  });\r\n}\r\n\r\n// Initialize clipboard button.\r\ninitClipboardButton();\r\n\r\n// Initialize Interactive Button.\r\ninitInteractiveButton();\r\n\r\n// Initialize Interactive Slider.\r\ninitInteractiveSlider();\n\n//# sourceURL=webpack://demo/./src/pages/form-advanced.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/pages/form-advanced.js"]();
/******/ 	
/******/ })()
;