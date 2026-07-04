# claude-api

Simple static chat UI for the Claude API, deployed as a Vercel static site + serverless functions.

## How it works

- `index.html` / `css/styles.css` / `js/*.js` / `chat-app.js` — static frontend. Chat history persists in `localStorage`; the model is selected from a dropdown.
- `api/chat.js` — serverless proxy that forwards messages to `https://api.anthropic.com/v1/messages` using a server-side API key. The key never reaches the browser.
- `api/auth.js` — serverless endpoint that checks the gate password against an environment variable. The real password never reaches the browser either.
- `js/gate.js` — shows a password prompt on load; on success, stashes the password in `sessionStorage` so `chat-app.js` can send it as a header on chat requests.

Both `api/chat.js` and `api/auth.js` require the same password (`GATE_PASSWORD`) — the gate isn't just cosmetic, the proxy itself rejects requests without it.

## Environment variables

Set these wherever the app runs (Vercel project settings, or a local `.env` for `vercel dev`):

| Variable | Purpose |
|---|---|
| `ANTHROPIC_API_KEY` | Your real Claude API key, used server-side by `api/chat.js` |
| `GATE_PASSWORD` | The password required to unlock the UI and use the chat proxy |

## Local development

Requires the [Vercel CLI](https://vercel.com/docs/cli) since `api/*.js` are serverless functions — opening `index.html` directly won't run them.

```bash
npm i -g vercel
vercel login
vercel dev
```

Create a `.env` file in the project root first:

```
ANTHROPIC_API_KEY=sk-ant-...
GATE_PASSWORD=your_chosen_password
```

## Deployment

Deploy with `vercel` / `vercel --prod`, or connect the repo in the Vercel dashboard. Set `ANTHROPIC_API_KEY` and `GATE_PASSWORD` under Project Settings → Environment Variables before the first deploy.
