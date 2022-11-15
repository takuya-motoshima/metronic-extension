import {
  // components
  BlockUI,
  Datatable,
  Dialog,
  Dropzone,
  ImageInput,
  initClipboard,
  initDatepicker,
  initTooltip,
  Tagify,
  Toast,

  // dom
  selectRef,

  // http
  // fetchDataUrl,
  // fetchDataUrlUsingCanvas,

  // misc
  isPlainObject,

  // validators
  Validation
} from 'metronic-extension';
import DemoModal from '~/pages/DemoModal';
import DemoApi from '~/pages/DemoApi';
import persons from '~/pages/persons.json';

function initCodeCopyButton() {
  for (let highlight of $('.highlight')) {
    const copy = highlight.querySelector('.highlight-copy');
    if (!copy)
      continue;
    const clipboard = new ClipboardJS(copy, {
      target: trigger => {
        const highlight = trigger.closest('.highlight');
        let el = highlight.querySelector('.tab-pane.active');
        if (!el)
          el = highlight.querySelector('.highlight-code');
        return el;
      }
    });
    clipboard.on('success', function(e) {
      const caption = e.trigger.innerHTML;
      e.trigger.innerHTML = 'copied';
      e.clearSelection();
      setTimeout(() => {
        e.trigger.innerHTML = caption;
      }, 2000);
    });
  }
}
function initBlockUI() {
  const blockUI = new BlockUI(ref.blockUiTarget, 'Loading...', false);
  $('body').on('click', '[data-on-block]', () => {
    if (blockUI.isBlocked()) {
      blockUI.release();
      ref.blockUiButton.text('Block');
    } else {
      blockUI.block();
      ref.blockUiButton.text('Release');
    }
  });
}

function initDatatable() {
  const options = {
    dom: `<'row'<'col-12 dataTables_pager'p>><'row'<'col-12'tr>><'row'<'col-12 dataTables_pager'p>>`,
    columnDefs: [
      {targets: 0, data: 'name'},
      {targets: 1, data: 'position'},
      {targets: 2, data: 'office'},
      {targets: 3, data: 'age'},
      {targets: 4, data: 'startDate'},
      {targets: 5, data: 'salary'}
    ],
    pageLength: 4
  };
  if (isLocalServer)
    options.ajax = {
      url: 'http://localhost:8080/persons',
      data: d => {
        d.search = {searchWord: ref.searchWord.val()};
      }
    };
  const dataTable = new Datatable(ref.dataTable, options);
  $('body').on('input', '[data-on-search-persons]', evnt => {
    if (isLocalServer)
      dataTable.reload();
    else {
      const nameColumnSelctor = 0;
      dataTable.filter(nameColumnSelctor, ref.searchWord.val());
    }
  });
  if (!isLocalServer)
    for (let row of persons)
      dataTable.createRow(row, false);
}

function initDialog() {
  $('body')
    .on('click', '[data-on-confirm-dialog]', async () => {
      const res = await Dialog.confirm('Here\'s a basic example of confirm dialog!', {confirmButtonText: 'Yes', cancelButtonText: 'No',});
      Dialog.info(`The return value is ${res}`);
    })
    .on('click', '[data-on-success-dialog]', () => {
      Dialog.success('Here\'s a basic example of success dialog!');
    })
    .on('click', '[data-on-error-dialog]', () => {
      Dialog.error('Here\'s a basic example of error dialog!');
    })
    .on('click', '[data-on-warning-dialog]', () => {
      Dialog.warning('Here\'s a basic example of warning dialog!');
    })
    .on('click', '[data-on-info-dialog]', () => {
      Dialog.info('Here\'s a basic example of info dialog!');
    })
    .on('click', '[data-on-unknown-error-dialog]', () => {
      Dialog.unknownError('The process was interrupted due to an error. Please try again.', {title: 'An unexpected error has occurred.'});
    })
    .on('click', '[data-on-loading-dialog]', () => {
      Dialog.loading('Here\'s a basic example of loading dialog!');
      setTimeout(() => {
        Dialog.close();
      }, 3000);
    });
}

function initImageInput() {
  const language = {change: 'Change', remove: 'Delete', cancel: 'Cancel change'};
  const origin = isLocalServer ? 'http://localhost:8080/' : '';
  const imageInput1 = new ImageInput(ref.imageInput1, {
    default: `${origin}media/default-avatar.svg`,
    hiddenEl: ref.hiddenImage1.get(0),
    language
  });
  new ImageInput(ref.imageInput2, {
    default: `${origin}media/default-avatar.svg`,
    current: `${origin}media/avatar1.png`,
    language
  });
  new ImageInput(ref.imageInput3, {
    current: `${origin}media/avatar2.png`,
    readonly: true
  });
  const imageInput4 = new ImageInput(ref.imageInput4, {
    default: `${origin}media/default-avatar.svg`,
    current: `${origin}media/avatar3.png`,
    language
  });
  imageInput4.onchange(dataUrl => {
    Dialog.info('Changed image');
  });
  $('body').on('click', '[data-on-download-img-1]', evnt => {
    evnt.preventDefault();
    imageInput1.download();
  })
}

function initModal() {
  $('body').on('click', '[data-on-launch-modal]', async () => {
    const res = await demoModal.show('Modal title', 'Modal body text goes here.');
    Dialog.info(`The modal response is ${res}`);
  });
}

function initToast() {
  $('body')
    .on('click', '[data-on-success-toast]', () => {
      Toast.success('Hello, world! This is a toast message.');
    })
    .on('click', '[data-on-info-toast]', () => {
      Toast.info('Hello, world! This is a toast message.');
    })
    .on('click', '[data-on-warning-toast]', () => {
      Toast.warning('Hello, world! This is a toast message.');
    })
    .on('click', '[data-on-error-toast]', () => {
      Toast.error('Hello, world! This is a toast message.');
    })
    .on('click', '[data-on-toast-with-title]', () => {
      Toast.success('Hello, world! This is a toast message.', 'Title test.');
    })

    ;
}

function initRestClient() {
  function writeLog(message, clear = false) {
    if (clear)
      ref.requestLog.text('');
    let text =  ref.requestLog.text();
    if (text)
      text += "\n";
    text += message;
    ref.requestLog.text(text);
  }
  const validation = new Validation(ref.restClientForm, {
    name: {
      validators: {
        notEmpty: {message: 'Enter here.'}
      }
    }
  });
  validation.onValid(async () => {
    try {
      writeLog('Request sent.', true);
      validation.onIndicator();
      const method = ref.requestMethod.val();
      const res = method === 'GET' ?
        await demoApi.getPerson(1) : method === 'POST' ?
        await demoApi.createPerson(new FormData(validation.form)) : method === 'PUT' ?
        await demoApi.updatePerson(1, new FormData(validation.form)) :
        await demoApi.deletePerson(1);
      validation.offIndicator();
      writeLog('The request was successful.');
      writeLog(`Response data: ${JSON.stringify(res.data, null, 2)}`);
    } catch (err) {
      validation.offIndicator();
      writeLog(err.message);
      throw err;
    }
  });
  $('body').on('change', '[data-on-change-request-method]', () => {
    if (/GET|DELETE/.test(ref.requestMethod.val())) {
      ref.nameInput.addClass('d-none');
      validation.disableValidator('name');
    } else {
      ref.nameInput.removeClass('d-none');
      validation.enableValidator('name');
    }
    ref.requestLog.text('');
  });
}

function initCustomValidation() {
  const validation = new Validation(ref.customValidationForm, {
    cidr: {
      validators: {
        notEmpty: {message: 'Enter here.'},
        isCidr: {message: 'This is not correct.'}
      }
    },
    directory: {
      validators: {
        notEmpty: {message: 'Enter here.'},
        isDirectory: {message: 'This is not correct.'}
      }
    },
    host: {
      validators: {
        notEmpty: {message: 'Enter here.'},
        isHost: {message: 'This is not correct.'}
      }
    },
    hostOrIp: {
      validators: {
        notEmpty: {message: 'Enter here.'},
        isHostOrIp: {message: 'This is not correct.'}
      }
    },
    ip: {
      validators: {
        notEmpty: {message: 'Enter here.'},
        isIp: {message: 'This is not correct.'}
      }
    },
    kana: {
      validators: {
        notEmpty: {message: 'Enter here.'},
        isKana: {message: 'This is not correct.'}
      }
    },
    port: {
      validators: {
        notEmpty: {message: 'Enter here.'},
        isPort: {message: 'This is not correct.'}
      }
    },
    unixUserName: {
      validators: {
        notEmpty: {message: 'Enter here.'},
        isUnixUserName: {message: 'This is not correct.'}
      }
    },
    phoneNumberJp: {
      validators: {
        notEmpty: {message: 'Enter here.'},
        isPhoneNumberJp: {message: 'This is not correct.'}
      }
    },
    betweenValues: {
      validators: {
        notEmpty: {message: 'Enter here.'},
        isIntegersBetween: {
          message: 'This is not correct.',
          min: 1,
          max: 99
        }
      }
    },
    html: {
      validators: {
        notEmpty: {message: 'Enter here.'},
        isHTML: {message: 'This is not correct.'}
      }
    }
  });
  validation
    .onValid(async () => {
      Dialog.success('Form has been successfully submitted!', {confirmButtonText: 'OK, got it!'});
    })
    .onFieldValid(name => {
      console.log(`${name} field is valid`);
    })
    .onFieldInvalid(name => {
      console.log(`${name} field is invalid`);
    });
}

function initSelectRefAttributeNodes() {
  const validation = new Validation(ref.nodeSelectionForm, {
    selectDestination: {
      validators: {
        notEmpty: {message: 'Enter here.'},
        isHTML: {message: 'This is not correct.'}
      }
    }
  });
  validation.onValid(async () => {
    function selectionResultsToJSON(result, returnResults = true) {
      for (let [key, value] of Object.entries(result)) {
        if (isPlainObject(value)) {
          selectionResultsToJSON(value, false);
          continue;
        }
        if (value instanceof HTMLElement)
          result[key] = value.outerHTML;
        else if (Array.isArray(value)) {
          result[key] = value.map(node => node.outerHTML);
        } else
          throw new Error('Unprocessable type');
      }
      if (returnResults)
        return JSON.stringify(result, null, 2);
    }
    const context = $('<div />').html(ref.selectDestination.val());
    let result = selectRef(context, null, null, true);
    result = selectionResultsToJSON(result);
    ref.selectionResult.text(result);
  });
  validation.validate();
}

function initTagify() {
  new Tagify(ref.basicTagify);
  new Tagify(ref.readonlyTagify, {readonly: true});
  new Tagify(ref.maxlenLimitTagify, {maxChars: 10});
  new Tagify(ref.inlineSuggestionsTagify, {
    whitelist: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7'],
    dropdown: {
      maxItems: 20,
      classname: 'tagify__inline__suggestions'
    }
  });
  new Tagify(ref.listSuggestionsTagify, {
    whitelist: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7'],
    dropdown: {maxItems: 20}
  });
  const tagify = new Tagify(ref.handleEventsTagify, {
    whitelist: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7'],
    dropdown: {maxItems: 20}
  });
  tagify
    .onAddTag(evnt => alert('Add tags'))
    .onRemoveTag(evnt => alert('Delete tag'))
    .onChangeTag(evnt => alert('Change (add or remove) a tag'));
}

function initDropzone() {
  const dropzone = new Dropzone(ref.dropzone, {
    hiddenInputContent: ref.hiddenInputContent.get(0),
    maxFilesize: 10,
    dictDescriptionMessage: 'Files up to 10 MB can be uploaded',
  });
  dropzone.onAddFile(file => {
    alert(`From additional handlers. Select "${file.name}"`);
  });
}

const ref = selectRef();
const isLocalServer = !location.host;
const demoModal = new DemoModal();
const demoApi = new DemoApi('http://localhost:8080/');

initCodeCopyButton();
initBlockUI();
initDatatable();
initDialog();
initImageInput();
initClipboard(document.body);
initDatepicker(ref.datePicker, {
  minDate: moment().format('YYYY/M/D'),
  locale: 'en',
  language: {
    applyLabel: 'OK',
    cancelLabel: 'Cancel'
  }
});
initTooltip(document.body);
initModal();
initToast();
initRestClient();
initCustomValidation();
initSelectRefAttributeNodes();
initTagify();
initDropzone();