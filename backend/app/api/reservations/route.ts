import { NextRequest, NextResponse } from "next/server";

// In-memory store — swap for a real DB (e.g. Supabase, Prisma) in production
const reservations: Reservation[] = [];

interface Reservation {
  id: string;
  date: string;
  guests: number;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  createdAt: string;
  status: "confirmed";
}

function generateId(): string {
  return `BR${Math.floor(Math.random() * 900000 + 100000)}`;
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { date, guests, time, name, email, phone, notes } = body;

    if (!date || !guests || !time || !name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
    }

    if (guests < 1 || guests > 8) {
      return NextResponse.json({ error: "Guests must be 1–8" }, { status: 400 });
    }

    const reservation: Reservation = {
      id: generateId(),
      date,
      guests: Number(guests),
      time,
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone ?? "").trim(),
      notes: String(notes ?? "").trim(),
      createdAt: new Date().toISOString(),
      status: "confirmed",
    };

    reservations.push(reservation);

    return NextResponse.json({ id: reservation.id, status: "confirmed" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ count: reservations.length, reservations });
}
