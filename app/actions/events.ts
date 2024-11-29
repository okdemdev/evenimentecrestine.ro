'use server';

import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';
import { IEvent } from '@/types';

export async function getEvents(): Promise<IEvent[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    await dbConnect();
    const events = await Event.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(events));
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return [];
  }
}

export async function getEventById(id: string): Promise<IEvent | null> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  try {
    await dbConnect();
    const event = await Event.findById(id);
    return event ? JSON.parse(JSON.stringify(event)) : null;
  } catch (error) {
    console.error('Failed to fetch event:', error);
    return null;
  }
}
