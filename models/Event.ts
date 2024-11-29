import mongoose, { Schema } from 'mongoose';
import { IEvent } from '@/types';

const eventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  hour: { type: String, required: true },
  month: { type: String, required: true },
  day: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  about: { type: String, required: true },
  image: { type: String, required: true },
  organizer: { type: String, required: true },
  price: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Event = mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);

export default Event;
