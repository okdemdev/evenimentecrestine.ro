import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Subscriber } from '@/models/Subscriber';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email } = await request.json();

    const subscriber = await Subscriber.create({ email });

    return NextResponse.json({ success: true, subscriber });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Acest email este deja înregistrat pentru notificări.' },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
