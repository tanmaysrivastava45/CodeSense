import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { supabase } from '../config/supabase.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.post('/rooms/create', authenticate, async (req, res) => {
  try {
    const { name, isPublic } = req.body;
    const userId = req.user.id;
    const roomId = uuidv4();

    const { data, error } = await supabase
      .from('collaboration_rooms')
      .insert({
        id: roomId,
        name: name || 'Untitled Room',
        creator_id: userId,
        is_public: isPublic || false,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    res.json({ room: data });
  } catch (error) {
    console.error('Create room error:', error);
    res.status(500).json({ error: 'Failed to create room' });
  }
});

router.get('/rooms', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from('collaboration_rooms')
      .select('*')
      .eq('creator_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ rooms: data });
  } catch (error) {
    console.error('Get rooms error:', error);
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

router.get('/rooms/:roomId', authenticate, async (req, res) => {
  try {
    const { roomId } = req.params;

    const { data, error } = await supabase
      .from('collaboration_rooms')
      .select('*')
      .eq('id', roomId)
      .single();

    if (error) throw error;

    res.json({ room: data });
  } catch (error) {
    console.error('Get room error:', error);
    res.status(500).json({ error: 'Failed to fetch room' });
  }
});

router.delete('/rooms/:roomId', authenticate, async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.user.id;

    const { error } = await supabase
      .from('collaboration_rooms')
      .delete()
      .eq('id', roomId)
      .eq('creator_id', userId);

    if (error) throw error;

    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Delete room error:', error);
    res.status(500).json({ error: 'Failed to delete room' });
  }
});

export default router;
