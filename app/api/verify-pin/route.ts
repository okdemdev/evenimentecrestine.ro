import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pin } = body;

    const correctPin = process.env.ADMIN_PIN;

    if (!correctPin) {
      return NextResponse.json({ error: 'PIN not configured' }, { status: 500 });
    }

    if (pin === correctPin) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid PIN' }, { status: 401 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to verify PIN' }, { status: 500 });
  }
}
