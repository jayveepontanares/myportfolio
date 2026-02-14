// Copied into assets/js for packaging
// Small helper for interactive bits
document.addEventListener('DOMContentLoaded',()=>{
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  const copyBtn = document.getElementById('copyEmail');
  if(copyBtn){
    copyBtn.addEventListener('click', async ()=>{
      const email = copyBtn.textContent.trim();
      try{
        await navigator.clipboard.writeText(email);
        const old = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(()=> copyBtn.textContent = old,1500);
      }catch(e){
        alert('Copy not supported. Email: '+email);
      }
    });
  }

  // Contact form validation and helpful warning for placeholder email
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', (e)=>{
      const action = (contactForm.getAttribute('action')||'').trim();
      if(action.includes('YOUR_EMAIL')){
        e.preventDefault();
        alert('Please replace YOUR_EMAIL@example.com in the form action with your real email address in contact.html before sending.');
        return;
      }

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      if(!name || !email || !message){
        e.preventDefault();
        alert('Please fill out name, email, and message.');
        return;
      }
      // Populate the hidden _replyto field so replies go to the visitor's email
      const replyInput = document.getElementById('_replyto');
      if(replyInput){
        replyInput.value = email;
      }
      // Let the form submit normally to the external service (Formsubmit)
    });
  }
});
