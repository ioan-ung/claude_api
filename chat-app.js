window.ChatApp = window.ChatApp || {};
(function (App) {
  App.callClaude = async function (opts) {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-gate-password': sessionStorage.getItem('gate-password') || ''
      },
      body: JSON.stringify({
        model: opts.model,
        max_tokens: 8192,
        messages: opts.messages
      })
    });
    return res.json();
  };
})(window.ChatApp);
