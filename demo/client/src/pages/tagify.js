import {Tagify, selectRef} from 'metronic-extension';
import highlight from '~/shared/highlight';

highlight();
const ref = selectRef();
const basicTagify = new Tagify(ref.basicTagify);
const readonlyTagify = new Tagify(ref.readonlyTagify, {
  readonly: true,
});
const maxlenTagify = new Tagify(ref.maxlenTagify, {
  maxChars: 10,
});
const inlineSuggestionsTagify = new Tagify(ref.inlineSuggestionsTagify, {
  whitelist: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7'],
  dropdown: {
    maxItems: 20,
    classname: 'tagify__inline__suggestions',
  }
});
const listSuggestionsTagify = new Tagify(ref.listSuggestionsTagify, {
  whitelist: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7'],
  dropdown: {maxItems: 20},
});
const eventTagify = new Tagify(ref.eventTagify, {
  whitelist: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7'],
  dropdown: {maxItems: 20},
});
eventTagify
  .onAddTag(evnt => alert('Add tag'))
  .onRemoveTag(evnt => alert('Delete tag'))
  .onChangeTag(evnt => alert('Change (add or remove) a tag'));
