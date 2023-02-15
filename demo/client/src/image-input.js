import {ImageInput, selectRef} from 'metronic-extension';
import highlight from '~/shared/highlight';

highlight();
const ref = selectRef();
const basicImageInput = new ImageInput(ref.basicImageInput, {
  default: '/build/media/default-avatar.svg',
  hiddenEl: ref.hidden.get(0),
  language: {
    change: 'Change',
    remove: 'Delete',
    cancel: 'Cancel change',
  },
});

const registeredImageInput = new ImageInput(ref.registeredImageInput, {
  default: '/build/media/default-avatar.svg',
  current: '/build/media/avatar1.png',
  language: {
    change: 'Change',
    remove: 'Delete',
    cancel: 'Cancel change',
  },
});

const readonlyImageInput = new ImageInput(ref.readonlyImageInput, {
  current: '/build/media/avatar2.png',
  readonly: true,
});

const eventImageInput = new ImageInput(ref.eventImageInput, {
  default: '/build/media/default-avatar.svg',
  current: '/build/media/avatar3.png',
  language: {change: 'Change', remove: 'Delete', cancel: 'Cancel change'},
});
eventImageInput.onchange(dataUrl => {
  alert('Changed image');
});