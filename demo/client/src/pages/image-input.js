import {components} from 'metronic-extension';

// Initialize ImageInput.
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

// Set callbacks for image changes.
basicImageInput.onChange(dataURL => {
  alert('Changed image');
});

// Initialize ImageInput.
const readonlyImageInput = new components.ImageInput(document.getElementById('readonlyImageInput'), {
  current: 'img/avatar3.png',
  readonly: true,
});