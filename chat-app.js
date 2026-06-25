window.ChatApp = window.ChatApp || {};
(function (App) {
  App.callClaude = async function (opts) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': opts.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
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
