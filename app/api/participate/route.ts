import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Participant } from '@/models/Participant';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { eventId, name, email, phoneNumber } = await request.json();

    // Validate required fields
    if (!eventId || !name || !email || !phoneNumber) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const participant = await Participant.create({
      eventId,
      name,
      email,
      phoneNumber,
    });

    return NextResponse.json({
      success: true,
      participant,
      ticketUrl: `/ticket/${participant._id}`,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
