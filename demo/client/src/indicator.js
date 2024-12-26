// Handle button click event.
document.getElementById('button1').addEventListener('click', event => {
  // Element to indecate.
  const button = event.currentTarget;

  // Activate indicator.
  button.setAttribute('data-kt-indicator', 'on');

  // Disable indicator after 3 seconds.
  setTimeout(function() {
    button.removeAttribute('data-kt-indicator');
  }, 3000);
});

// Handle button click event.
document.getElementById('button2').addEventListener('click', event => {
  // Element to indecate.
  const button = event.currentTarget;

  // Activate indicator.
  button.setAttribute('data-kt-indicator', 'on');

  // Disable indicator after 3 seconds.
  setTimeout(function() {
    button.removeAttribute('data-kt-indicator');
  }, 3000);
});

// Handle button click event.
document.getElementById('button3').addEventListener('click', event => {
  // Element to indecate.
  const button = event.currentTarget;

  // Activate indicator.
  button.setAttribute('data-kt-indicator', 'on');

  // Disable indicator after 3 seconds.
  setTimeout(function() {
    button.removeAttribute('data-kt-indicator');
  }, 3000);
});