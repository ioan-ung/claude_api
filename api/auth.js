export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body || {};
  const expected = process.env.GATE_PASSWORD;

  if (!expected) {
    return res.status(500).json({ error: 'GATE_PASSWORD not configured' });
  }

  if (password === expected) {
    return res.status(200).json({ ok: true });
  }
  return res.status(401).json({ ok: false });
}
