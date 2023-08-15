// import ClipboardJS from 'clipboard';

/**
 * Initialize the clipboard button.
 */
export default (context: JQuery|HTMLElement, delay: number = 3000): void => {
  // Check parameters.
  if (context instanceof $)
    context = (context as JQuery).get(0) as HTMLElement;
  else if (!(context instanceof HTMLElement))
    throw new TypeError('The context parameter specifies an HTMLElement or a JQuery object of HTMLElement');

  // Get the trigger element.
  const buttons = context.hasAttribute('data-clipboard-target') ? [context] : (context as HTMLElement).querySelectorAll('[data-clipboard-target]');

  // Set the copy event.
  for (let button of buttons) {
    const clipboard = new window.ClipboardJS(button);
    clipboard.on('success', (evnt: any) => {
      // Copy button element.
      const button = evnt.trigger as HTMLElement;

      // If the button does not have a clipboard-target attribute indicating the element to copy to, an error is returned.
      if (!button.dataset.clipboardTarget)
        throw new Error('The "data-clipboard-target" attribute of the clipboard target element must be set to the destination element');

      // The element with the value to copy.
      const target = ((context as HTMLElement).hasAttribute('data-clipboard-target') ? document.body : context as HTMLElement).querySelector(button.dataset.clipboardTarget)!;
      // const target = (context as HTMLElement).querySelector(button.dataset.clipboardTarget)!;

      // Returns an error if the target element cannot be found.
      if (!target)
        throw new Error(`No target element matching data-clipboard-target="${button.dataset.clipboardTarget}" was found`);

      // Copy icon.
      const copyIcon = button.querySelector('.ki-copy')!;
      // metronic version 8.1.7 or lower
      // const copyIcon = button.querySelector('.svg-icon')!;

      // Check icon.
      let checkIcon = button.querySelector('.ki-check')!;
      // metronic version 8.1.7 or lower
      // let checkIcon = button.querySelector('.bi-check')!;
      if (checkIcon)
        // Exit if check icon is already shown.
        return;

      // Create check icon.
      checkIcon = document.createElement('i');
      checkIcon.classList.add('ki-solid');
      checkIcon.classList.add('ki-check');
      checkIcon.classList.add('fs-2');
      // metronic version 8.1.7 or lower.
      // checkIcon.classList.add('bi');
      // checkIcon.classList.add('bi-check');
      // checkIcon.classList.add('fs-2x');

      // Append check icon.
      button.appendChild(checkIcon);

      // Highlight target.
      target.classList.add('text-success');

      // Hide copy icon.
      copyIcon.classList.add('d-none');

      // After the specified number of seconds, the copy icon is displayed again.
      setTimeout(()  => {
        // Remove check icon.
        copyIcon.classList.remove('d-none');

        // Show check icon back.
        button.removeChild(checkIcon);

        // Remove highlight.
        target.classList.remove('text-success');
      }, delay);
    });
  }
}