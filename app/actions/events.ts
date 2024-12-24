'use server';

import { unstable_noStore as noStore } from 'next/cache';
import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';
import { IEvent } from '@/types';

export async function getEvents(): Promise<IEvent[]> {
  noStore();
  try {
    await dbConnect();
    const events = await Event.find({})
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    
    console.log(`Fetched ${events.length} events`);
    
    return JSON.parse(JSON.stringify(events));
  } catch (error) {
    console.error('Failed to fetch events:', error);
    throw error;
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
