import {initPasswordToggle, selectRef} from 'metronic-extension';
import highlight from '~/shared/highlight';

highlight();
const ref = selectRef();
initPasswordToggle(ref.password);