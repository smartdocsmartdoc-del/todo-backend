import dotenv from 'dotenv';
dotenv.config();
export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;
  console.log('🪵 Login attempt:', { username, password });
  console.log('User name configured: ', process.env.USERNAME)
  if (
    username === process.env.USERNAME &&
    password === process.env.PASSWORD
  ) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
}