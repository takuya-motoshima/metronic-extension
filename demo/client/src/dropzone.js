import {Dropzone, selectRef} from 'metronic-extension';
import highlight from '~/shared/highlight';

highlight();
const ref = selectRef();
const dropzone = new Dropzone(ref.dropzone, {
  hiddenInputContent: ref.hidden.get(0),
  maxFilesize: 10,
  dictDescriptionMessage: 'Files up to 10 MB can be uploaded',
});
dropzone
  .onAddFile(file => {
    alert(`From additional handlers. Select ${file.name}`);
  })
  .onCancelFile(() => {
    alert('Canceled file selection');
  });