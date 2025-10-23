import supabase from '../../lib/supabaseClient.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('todos').select('*').order('id', { ascending: false });
    if (error) return res.status(400).json({ error: error.message });
    return res.json(data);
  }

  if (req.method === 'POST') {
    const { title } = req.body;
    const { data, error } = await supabase.from('todos').insert([{ title }]);
    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json(data[0]);
  }

  res.status(405).end();
}
