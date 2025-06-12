// Contact form AJAX
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const form = e.target;
      const data = {
        name: form.name.value,
        company: form.company.value,
        phone: form.phone.value,
        email: form.email.value,
        brief: form.brief.value
      };
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      document.getElementById('formMessage').textContent = result.message;
      if(res.ok) form.reset();
    });
  }

  // Cookie banner logic
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }
  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
      let c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  const banner = document.getElementById('cookie-banner');
  if (banner && !getCookie('cookieConsent')) {
    banner.style.display = 'block';
  }

  const acceptBtn = document.getElementById('accept-cookies');
  if (acceptBtn) {
    acceptBtn.addEventListener('click', function() {
      setCookie('cookieConsent', 'accepted', 365);
      banner.style.display = 'none';
    });
  }

  if (document.getElementById('decline-cookies')) {
    document.getElementById('decline-cookies').onclick = function() {
      setCookie('cookieConsent', 'declined', 180);
      document.getElementById('cookie-banner').style.display = 'none';
      if (typeof gtag === "function") {
        gtag('consent', 'update', {
          'ad_storage': 'denied',
          'analytics_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied'
        });
      }
    };
  }

  // Service card fade-in animation
  const cards = document.querySelectorAll('.service-card');
  function revealCards() {
    const trigger = window.innerHeight * 0.95;
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < trigger) {
        card.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', revealCards);
  revealCards();
});