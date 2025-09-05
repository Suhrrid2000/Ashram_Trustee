import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },       
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true }, // Array of image URLs
}, {
  timestamps: true, 
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
