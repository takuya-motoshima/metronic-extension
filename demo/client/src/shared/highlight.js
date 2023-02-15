export default () => {
  const elements = document.querySelectorAll('.highlight');
  for (let i = 0; i<elements.length; ++i) {
    const highlight = elements[i];
    const copy = highlight.querySelector('.highlight-copy');
    if (copy) {
      const clipboard = new ClipboardJS(copy, {
        target: function(trigger) {
          const highlight = trigger.closest('.highlight');
          const el = highlight.querySelector('.tab-pane.active');
          if (el == null)
            el = highlight.querySelector('.highlight-code');
          return el;
        }
      });
      clipboard.on('success', evnt => {
        const caption = evnt.trigger.innerHTML;
        evnt.trigger.innerHTML = 'copied';
        evnt.clearSelection();
        setTimeout(() => {
          evnt.trigger.innerHTML = caption;
        }, 2000);
      });
    }
  }
}