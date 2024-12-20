import { NextResponse } from 'next/server';
import { openDb } from '../../../lib/db';

export async function GET() {
  const db = await openDb();
  const certifications = await db.all('SELECT * FROM certifications');
  return NextResponse.json(certifications);
}

export async function POST(request: Request) {
  const db = await openDb();
  const { name, description, validUntil } = await request.json();
  const result = await db.run(
    'INSERT INTO certifications (name, description, validUntil) VALUES (?, ?, ?)',
    [name, description, validUntil]
  );
  return NextResponse.json({ id: result.lastID });
}

