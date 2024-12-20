import { NextResponse } from 'next/server';
import { openDb } from '../../../lib/db';

export async function GET() {
  const db = await openDb();
  const employees = await db.all('SELECT * FROM employees');
  return NextResponse.json(employees);
}

export async function POST(request: Request) {
  const db = await openDb();
  const { name, role, cpf, hireDate, whatsapp } = await request.json();
  const result = await db.run(
    'INSERT INTO employees (name, role, cpf, hireDate, whatsapp) VALUES (?, ?, ?, ?, ?)',
    [name, role, cpf, hireDate, whatsapp]
  );
  return NextResponse.json({ id: result.lastID });
}

