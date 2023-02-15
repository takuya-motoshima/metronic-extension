import {selectRef, Validation, isPlainObject} from 'metronic-extension';
import highlight from '~/shared/highlight';

highlight();
const ref = selectRef();
const validation = new Validation(ref.form, {
  html: {
    validators: {
      notEmpty: {message: 'Enter here.'},
      isHTML: {message: 'This is not correct.'}
    }
  }
});
validation.onValid(async () => {
  function toJson(result, ret = true) {
    for (let [key, value] of Object.entries(result)) {
      if (isPlainObject(value)) {
        toJson(value, false);
        continue;
      }
      if (value instanceof HTMLElement)
        result[key] = value.outerHTML;
      else if (Array.isArray(value)) {
        result[key] = value.map(node => node.outerHTML);
      } else
        throw new Error('Unprocessable type');
    }
    if (ret)
      return JSON.stringify(result, null, 2);
  }
  const context = $('<div />').html(ref.html.val());
  let result = selectRef(context, null, null, true);
  result = toJson(result);
  ref.results.text(result);
});
validation.validate();