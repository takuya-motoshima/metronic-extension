import DemoModal from '~/DemoModal';
import highlight from '~/shared/highlight';

highlight();
const demoModal = new DemoModal();
$('body').on('click', '[data-on-modal]', async () => {
  const res = await demoModal.show('Modal title', 'Modal body text goes here.');
  alert(`The modal response is ${res}`);
});