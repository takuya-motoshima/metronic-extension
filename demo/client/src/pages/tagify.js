import {Tagify} from 'metronic-extension';

// Initialize Tagify.
const basicTagify = new Tagify(document.getElementById('basicTagify'));

// Set callback functions for various operations.
basicTagify
  .onAddTag(evnt => {
    // Tag added.
    console.log('Tag added');
  })
  .onRemoveTag(evnt => {
    // Tag removed.
    console.log('Tag has been deleted');
  })
  .onChangeTag(evnt => {
    // Tag was changed.
    console.log('Tag has been changed');
  });

// Read-only.
new Tagify(document.getElementById('readonlyTagify'), {readonly: true});

// Inline Suggestions.
new Tagify(document.getElementById('inlineSuggestionsTagify'), {
  whitelist: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7'],
  dropdown: {
    maxItems: 20,
    classname: 'tagify__inline__suggestions',
  }
});

// List Suggestions.
new Tagify(document.getElementById('listSuggestionsTagify'), {
  whitelist: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7'],
  dropdown: {maxItems: 20},
});