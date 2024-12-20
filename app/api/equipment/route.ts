import { NextResponse } from 'next/server';
import { openDb } from '../../../lib/db';

export async function GET() {
  const db = await openDb();
  const equipment = await db.all('SELECT * FROM equipment');
  return NextResponse.json(equipment);
}

export async function POST(request: Request) {
  const db = await openDb();
  const { name, description, certification, approvedFor, validUntil, isValid, value, quantity } = await request.json();
  const result = await db.run(
    'INSERT INTO equipment (name, description, certification, approvedFor, validUntil, isValid, value, quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [name, description, certification, approvedFor, validUntil, isValid ? 1 : 0, value, quantity]
  );
  return NextResponse.json({ id: result.lastID });
}

