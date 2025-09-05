import express from 'express';
import Event from '../models/Event.js';
import upload from '../Middleware/upload.js';

const router = express.Router();

router.post('/', upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Image upload failed' });
    }

    const imageUrls = req.files.map(file => file.path); // Cloudinary secure URLs

    const newEvent = new Event({
      name: req.body.name,
      date: req.body.date,
      location: req.body.location,
      description: req.body.description,
      images: imageUrls,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET ALL EVENTS
 */
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * UPDATE EVENT - Multiple Images (append or replace)
 */
router.put('/:id', upload.array('images', 10), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      date: req.body.date,
      location: req.body.location,
      description: req.body.description,
    };

    if (req.files && req.files.length > 0) {
      const imageUrls = req.files.map(file => file.path);
      updateData.images = imageUrls;
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * DELETE EVENT
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
