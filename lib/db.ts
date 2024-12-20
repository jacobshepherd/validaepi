import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

let db: any = null;

async function openDb() {
  if (!db) {
    db = await open({
      filename: './validaepi.sqlite',
      driver: sqlite3.Database
    });
    
    // Create tables if they don't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        role TEXT,
        cpf TEXT,
        hireDate TEXT,
        whatsapp TEXT
      );

      CREATE TABLE IF NOT EXISTS certifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        validUntil TEXT
      );

      CREATE TABLE IF NOT EXISTS equipment (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        certification TEXT,
        approvedFor TEXT,
        validUntil TEXT,
        isValid INTEGER,
        value REAL,
        quantity INTEGER
      );

      CREATE TABLE IF NOT EXISTS assignments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        employeeId INTEGER,
        equipmentId INTEGER,
        quantity INTEGER,
        FOREIGN KEY (employeeId) REFERENCES employees(id),
        FOREIGN KEY (equipmentId) REFERENCES equipment(id)
      );
    `);
  }
  return db;
}

export { openDb };

