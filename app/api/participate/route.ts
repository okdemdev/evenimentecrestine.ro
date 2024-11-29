import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Participant } from '@/models/Participant';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { eventId, email, phoneNumber } = await request.json();

    const participant = await Participant.create({
      eventId,
      email,
      phoneNumber,
    });

    return NextResponse.json({
      success: true,
      participant,
      ticketUrl: `/ticket/${participant._id}`,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
