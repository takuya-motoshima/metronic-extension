import {initShowPasswordToggle, selectRef} from 'metronic-extension';
import highlight from '~/shared/highlight';

highlight();
const ref = selectRef();
initShowPasswordToggle(ref.password);