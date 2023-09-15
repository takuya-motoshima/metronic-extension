import {Validation, Dialog, selectRef} from 'metronic-extension';
import highlight from '~/shared/highlight';

highlight();
const ref = selectRef();
const validation = new Validation(ref.form, {
  ipRange: {
    validators: {
      notEmpty: {message: 'Enter here.'},
      isIP: {message: 'This is not correct.', allowIPRange: true}
    }
  },
  filePath: {
    validators: {
      notEmpty: {message: 'Enter here.'},
      isPath: {message: 'This is not correct.'}
    }
  },
  fqdn: {
    validators: {
      notEmpty: {message: 'Enter here.'},
      isFQDN: {message: 'This is not correct.'}
    }
  },
  fqdnOrIp: {
    validators: {
      notEmpty: {message: 'Enter here.'},
      isFQDNorIP: {message: 'This is not correct.'}
    }
  },
  ip: {
    validators: {
      notEmpty: {message: 'Enter here.'},
      isIP: {message: 'This is not correct.'}
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
  numericRange: {
    validators: {
      notEmpty: {message: 'Enter here.'},
      isNumericRange: {
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