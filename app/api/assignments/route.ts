import { NextResponse } from 'next/server';
import { openDb } from '../../../lib/db';

export async function GET() {
  const db = await openDb();
  const assignments = await db.all(`
    SELECT a.id, e.name as employeeName, eq.name as equipmentName, a.quantity
    FROM assignments a
    JOIN employees e ON a.employeeId = e.id
    JOIN equipment eq ON a.equipmentId = eq.id
  `);
  return NextResponse.json(assignments);
}

export async function POST(request: Request) {
  const db = await openDb();
  const { employeeId, equipmentId, quantity } = await request.json();
  const result = await db.run(
    'INSERT INTO assignments (employeeId, equipmentId, quantity) VALUES (?, ?, ?)',
    [employeeId, equipmentId, quantity]
  );
  return NextResponse.json({ id: result.lastID });
}

