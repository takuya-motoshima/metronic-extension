import {Validation, Dialog, selectRef} from 'metronic-extension';
import highlight from '~/shared/highlight';

highlight();
const ref = selectRef();
const validation = new Validation(ref.form, {
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