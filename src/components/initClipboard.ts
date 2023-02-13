// import ClipboardJS from 'clipboard';

/**
 * Initialize the clipboard button.
 */
export default (context: JQuery|HTMLElement, delayMSec: number = 3000): void => {
  // Check the argument.
  if (context instanceof $)
    context = (context as JQuery).get(0) as HTMLElement;
  else if (!(context instanceof HTMLElement))
    throw new TypeError('The context parameter specifies an HTMLElement or a JQuery object of HTMLElement');
  for (let button of (context as HTMLElement).querySelectorAll('[data-clipboard-target]')) {
    const clipboard = new window.ClipboardJS(button);
    // const clipboard = new ClipboardJS(button);
    clipboard.on('success', (evnt: any) => {
    // clipboard.on('success', (evnt: ClipboardJS.Event) => {
      const button = evnt.trigger as HTMLElement;
      if (!button.dataset.clipboardTarget)
        throw new Error('The "data-clipboard-target" attribute of the clipboard target element must be set to the destination element');
      const copyTo = (context as HTMLElement).querySelector(button.dataset.clipboardTarget)!;
      const svgIcon = button.querySelector('.svg-icon')!;
      let checkIcon = button.querySelector('.bi.bi-check');
      if (checkIcon)
        return;
      checkIcon = document.createElement('i');
      checkIcon.classList.add('bi');
      checkIcon.classList.add('bi-check');
      checkIcon.classList.add('fs-2x');
      button.appendChild(checkIcon);
      const classes = ['text-success', 'fw-boldest'];
      copyTo.classList.add(...classes);
      button.classList.add('btn-success');
      svgIcon!.classList.add('d-none');
      setTimeout(()  => {
        svgIcon.classList.remove('d-none');
        button.removeChild(checkIcon!);
        copyTo.classList.remove(...classes);
        button.classList.remove('btn-success');
      }, delayMSec);
    });
  }
}