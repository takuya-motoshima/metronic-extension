import {components} from 'metronic-extension';

// Initialize the component and set up event listeners.
const basicTagify = new components.Tagify(document.getElementById('basicTagify'));

// Set callback functions for various operations.
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

// Read-only.
new components.Tagify(document.getElementById('readonlyTagify'), {
  readonly: true,
});

// Inline Suggestions.
new components.Tagify(document.getElementById('inlineSuggestionsTagify'), {
  whitelist: ['tag1', 'tag2', 'tag3'],
  dropdown: {
    maxItems: 20,
    classname: 'tagify__inline__suggestions',
  }
});

// List Suggestions.
new components.Tagify(document.getElementById('listSuggestionsTagify'), {
  whitelist: ['tag1', 'tag2', 'tag3'],
  dropdown: {
    maxItems: 20,
  },
});

// Single-Value Select.
new components.Tagify(document.getElementById('singleValueSelectTagify'), {
  enforceWhitelist: true,
  mode: 'select',
  whitelist: ['tag1', 'tag2', 'tag3'],
  dropdown: {
    closeOnSelect: true, // Close the dropdown when a suggestion is selected
    maxItems: Infinity,
  },
});