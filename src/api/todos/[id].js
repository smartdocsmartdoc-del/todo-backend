import supabase from '../../lib/supabaseClient.js';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { title, done } = req.body;
    const { data, error } = await supabase.from('todos').update({ title, done }).eq('id', id);
    if (error) return res.status(400).json({ error: error.message });
    return res.json(data[0]);
  }

  if (req.method === 'DELETE') {
    const { error } = await supabase.from('todos').delete().eq('id', id);
    if (error) return res.status(400).json({ error: error.message });
    return res.json({ message: 'Deleted successfully' });
  }

  res.status(405).end();
}
