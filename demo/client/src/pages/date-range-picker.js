import {initDatepicker, selectRef} from 'metronic-extension';
import highlight from '~/shared/highlight';

highlight();
const ref = selectRef();
initDatepicker(ref.dateRangePicker, {
  // minDate: moment().format('YYYY/M/D'),
  // locale: 'ja',
});