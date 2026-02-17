// Copied into assets/js for packaging
// Small helper for interactive bits
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const copyBtn = document.getElementById('copyEmail');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        const old = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = old, 1500);
      } catch (e) {
        alert('Copy not supported. Email: ' + email);
      }
    });
  }
});

//initialize emailjs with your user ID
(function() {
  emailjs.init('OdVEFY-c_OnI5O8oN');
})();

//Attach event listener to the form
window.onload = function() {
const form = this.document.getElementById('contactForm');
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

//Collect form data
const templateParams = {
  name: document.getElementById('name').value,
  email: document.getElementById('email').value,
  message: document.getElementById('message').value,
  subject: document.getElementById('subject').value 
};

//Send the email using EmailJS
emailjs.send('service_gz2qiop', 'template_ca5rvtx', templateParams)
  .then(function(response) {
     alert('SUCCESS!');
     console.log('Email sent successfully:', response);
  }, function(error) {
     alert('FAILED...', error);
     console.error('Error sending email:', error);
  });
});
};