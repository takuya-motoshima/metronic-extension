import {components} from 'metronic-extension';

// Initialize the component and set up event listeners.
const basicTagify = new components.Tagify(document.getElementById('basicTagify'));

basicTagify
  .onAddTag(event => {
    // Tag added.
    console.log('Tag added');
  })
  .onRemoveTag(event => {
    // Tag removed.
    console.log('Tag has been deleted');
  })
  .onChangeTag(event => {
    // Tag was changed.
    console.log('Tag has been changed');
  });

new components.Tagify(document.getElementById('readonlyTagify'), {readonly: true});

new components.Tagify(document.getElementById('inlineSuggestionsTagify'), {
  whitelist: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7'],
  dropdown: {
    maxItems: 20,
    classname: 'tagify__inline__suggestions',
  }
});

new components.Tagify(document.getElementById('listSuggestionsTagify'), {
  whitelist: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7'],
  dropdown: {maxItems: 20},
});