// Poartă de parolă: acoperă pagina până când userul introduce parola corectă.
// Parola e verificată server-side (api/auth.js), niciodată trimisă în clar către client.
// Se încarcă primul, înaintea restului scripturilor.
(function () {
  var overlay = document.getElementById('gate');
  var input = document.getElementById('gate-password');
  var btn = document.getElementById('gate-btn');
  var msg = document.getElementById('gate-msg');

  function check() {
    var password = input.value;
    btn.disabled = true;

    fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: password })
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        btn.disabled = false;
        if (data.ok) {
          sessionStorage.setItem('gate-password', password);
          overlay.remove();
          document.body.classList.remove('locked');
        } else {
          msg.textContent = 'Parolă greșită.';
          msg.style.color = '#F09595';
          input.value = '';
          input.focus();
        }
      })
      .catch(function (err) {
        btn.disabled = false;
        msg.textContent = 'Eroare de rețea: ' + err.message;
        msg.style.color = '#F09595';
      });
  }

  btn.addEventListener('click', check);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      check();
    }
  });

  input.focus();
})();
