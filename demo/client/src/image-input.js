import {components} from 'metronic-extension';

// Initialize the component and set up event listeners.
const basicImageInput = new components.ImageInput(document.getElementById('basicImageInput'), {
  default: 'img/avatar1.svg',
  current: 'img/avatar2.png',
  width: 125,
  height: 125,
  hiddenEl: document.getElementById('basicImageDataURL'),
  language: {
    change: 'Change this image',
    remove: 'Delete this image',
    cancel: 'Cancel changes to this image'
  }
});

basicImageInput.onChange(dataURL => {
  alert('Changed image');
});

const readonlyImageInput = new components.ImageInput(document.getElementById('readonlyImageInput'), {
  current: 'img/avatar3.png',
  readonly: true,
});