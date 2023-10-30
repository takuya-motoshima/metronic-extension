import {Dropzone} from 'metronic-extension';

// Initializes Dropzone.
const dropzone = new Dropzone(document.getElementById('myDropzone'), {
  hiddenInputContent: document.getElementById('myFileContent'),
  maxFilesize: 10,
  dictDescriptionMessage: 'Files up to 10 MB can be uploaded',
  acceptedFiles: 'image/jpeg,image/png,image/gif',
});

// Initialize drag & drop events.
dropzone
  .onAddFile(file => {
    // Called when a file is added.
    alert(`From additional handlers. Select ${file.name}`);
  })
  .onCancelFile(() => {
    // Called when an uploaded file is canceled.
    alert('Canceled file selection');
  });