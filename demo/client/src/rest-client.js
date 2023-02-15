import {selectRef, Validation} from 'metronic-extension';
import DemoApi from '~/DemoApi';
import highlight from '~/shared/highlight';

highlight();
const ref = selectRef();
const demoApi = new DemoApi();
const validation = new Validation(ref.form, {
  name: {
    validators: {
      notEmpty: {message: 'Enter here.'}
    }
  }
});
validation.onValid(async () => {
  try {
    validation.onIndicator();
    let res;
    switch (ref.method.val()) {
    case 'GET':
      res = await demoApi.getPerson(1);
      break;
    case 'POST':
      res = await demoApi.createPerson(new FormData(validation.form));
      break;
    case 'PUT':
      res = await demoApi.updatePerson(1, new FormData(validation.form));
      break;
    case 'DELETE':
      res = await demoApi.deletePerson(1);
      break;
    default:
      break;
    }
    validation.offIndicator();
    alert(`The request was successful.\nResponse data: ${JSON.stringify(res.data, null, 2)}`);
  } catch (err) {
    validation.offIndicator();
    alert(err.message);
    throw err;
  }
});
$('body').on('change', '[data-on-change-method]', () => {
  if (/GET|DELETE/.test(ref.method.val())) {
    ref.name.addClass('d-none');
    validation.disableValidator('name');
  } else {
    ref.name.removeClass('d-none');
    validation.enableValidator('name');
  }
});
