import {selectRef} from 'metronic-extension';

// Search for elements.
const ref = selectRef();

// Initialize icon preview modal.
const iconPreviewModal = new bootstrap.Modal(ref.iconPreviewModal.get(0));

// Escape HTML special characters.
const escapeHtmlSpecialCharacters = html => {
  if (html == null)
    return '';
  return String(html)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Initialize events.
$('body')
  .on('click', '[data-on-change-style]', evnt => {
    // When the style radio button is clicked, the style of the icon list is toggled.
    ref.listing
      .removeClass('keenicons-solid keenicons-duotone keenicons-outline')
      .addClass(`keenicons-${evnt.currentTarget.value}`);
  })
  .on('click', '[data-on-use-icon]', evnt => {
    // Show the icon preview modal when the use button is clicked.
    // Clicked button element.
    const button = $(evnt.currentTarget);

    // Style of the selected icon.
    const style = ref.style.filter(':checked').val();

    // Icon Name.
    const name = button.closest('[data-icon-preview]').find('[data-icon-name]').text();

    // Generate the code for the icon.
    let code;
    if (style === 'duotone') {
      const paths = parseInt(button.attr('data-icon-paths'));
      code = escapeHtmlSpecialCharacters(`<i class="ki-duotone ki-${name}">`);
      for (let i = 1; i <= paths; i++)
        code += escapeHtmlSpecialCharacters(`\n <span class="path${i}"></span>`);
      code += escapeHtmlSpecialCharacters("\n</i>")
    } else
      code = escapeHtmlSpecialCharacters(`<i class="ki-${style} ki-${name}"></i>`);

    // Set the icon name and code for the icon preview modal.
    ref.useTitle.text(name);
    ref.useCode.html(code);

    // Show icon preview modal.
    iconPreviewModal.show();
  });

// Initialize the process of copying the icon code.
new ClipboardJS(ref.useCodeCopyButton.get(0), {
  target: ref.useCode.get(0),
  text: e =>  e.innerText,
}).on('success', (() => {
  ref.useCodeCopyButton.addClass('active');
  ref.useCodeCopyButton.find('.ki-copy').addClass('d-none'),
  ref.useCodeCopyButton.find('.ki-check').removeClass('d-none'),
  setTimeout((() => {
    ref.useCodeCopyButton.removeClass('active');
    ref.useCodeCopyButton.find('.ki-copy').removeClass('d-none');
    ref.useCodeCopyButton.find('.ki-check').addClass('d-none');
  }), 3000)
}))