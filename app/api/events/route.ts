import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const { date, city, address, ...rest } = body;

    // Extract month and day from the date
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString('ro-RO', { month: 'long' });
    const day = dateObj.getDate().toString();

    // Combine city and address for the location field
    const location = `${city}, ${address}`;

    const event = await Event.create({
      ...rest,
      month,
      day,
      location,
    });

    // Revalidate the home page after creating a new event
    revalidatePath('/');

    return NextResponse.json(
      { success: true, eventId: event._id },
      {
        headers: {
          'Cache-Control': 'no-store, must-revalidate',
        },
      }
    );
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const events = await Event.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json(events, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}
