/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
function initClipboardButton() {
  // Copy button and the element to be copied.
  const button = document.getElementById('copy');
  const input = document.getElementById('input');

  // Initialize clipboard.
  const clipboard = new ClipboardJS(button);

  // Copy text to clipboard. For more info check the plugin's documentation: https://clipboardjs.com/.
  clipboard.on('success', evnt => {
    // Save the current caption of the button.
    const caption = button.innerHTML;
    
    //　Change the style of the input element being copied.
    input.classList.add('bg-success');
    input.classList.add('text-inverse-success');

    // Copy button caption to "copied".
    button.innerHTML = 'Copied!';

    // After a certain time, the input element's style and button caption are restored to the way they were before copying.
    setTimeout(() => {
      button.innerHTML = caption;
      input.classList.remove('bg-success');
      input.classList.remove('text-inverse-success');
    }, 3000);

    // Deselects the input element.
    evnt.clearSelection();
  });
}

function initInteractiveButton() {
  // Initialize Interactive Button.
  const options = document.querySelectorAll('[data-dvanced-forms="interactive"]');
  const input = document.querySelector('[name="amount"]');

  // The value selected in the button group is reflected in the input element.
  options.forEach(option => {
    option.addEventListener('click', evnt => {
      evnt.preventDefault();
      input.value = evnt.target.innerText;
    });
  });
}

function initInteractiveSlider() {
  // Initialize Interactive Slider.
  var slider = document.getElementById('slider');
  var label = document.getElementById('sliderLabel');
  noUiSlider.create(slider, {
    start: [5],
    connect: true,
    range: {
      min: 1,
      max: 500
    }
  });

  slider.noUiSlider.on("update", (values, handle) => {
    label.innerHTML = Math.round(values[handle]);
    if (handle)
      label.innerHTML = Math.round(values[handle]);
  });
}

// Initialize clipboard button.
initClipboardButton();

// Initialize Interactive Button.
initInteractiveButton();

// Initialize Interactive Slider.
initInteractiveSlider();
/******/ })()
;