// Copied into assets/js for packaging
// Small helper for interactive bits
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Back to Top button logic
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

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

  const downloadBtn = document.getElementById('downloadResume');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.href = 'assets/files/resume.pdf';
      link.download = 'Jayvee_Pontanares_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  const brandWrap = document.querySelector('.brand-wrap');
  if (brandWrap) {
    const updateTheme = (isDark) => {
      document.body.classList.toggle('dark-theme', isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      updateTheme(true);
    }
    brandWrap.addEventListener('click', () => {
      updateTheme(!document.body.classList.contains('dark-theme'));
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
  if (!form) return;
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
     // Clear the form fields
     form.reset();
  }, function(error) {
     alert('FAILED...', error);
     console.error('Error sending email:', error);
  });
});
};