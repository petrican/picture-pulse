import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { promises as fs } from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

const dbFilePath = path.join(process.cwd(), 'config', 'database.json');

export async function POST(req: Request) {
  try {
    const dbFile = await fs.readFile(dbFilePath, 'utf-8');
    const dbData = JSON.parse(dbFile);

    if (dbData.adminSet) {
      return NextResponse.json({ message: 'Admin setup is already completed.' }, { status: 400 });
    }
    dbData.adminSet = true;
    await fs.writeFile(dbFilePath, JSON.stringify(dbData, null, 2));
    
    const body = await req.json();
    const { sitePassword, siteUsername } = body;
    const hashedPassword = await bcrypt.hash(sitePassword, 10);

    const connectionConfig = {
      host: dbData.dbHost || '127.0.0.1',
      port: dbData.dbPort, 
      database: dbData.dbName,
      user: dbData.dbUser,
      password: dbData.dbPassword,
    };
    let connection;
    connection = await mysql.createConnection(connectionConfig);

    // Create the users table if it does not exist
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('ADMIN', 'USER') DEFAULT 'USER',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert the admin user into the table if it doesn't exist
    const [rows] = await connection.execute(
      `SELECT * FROM users WHERE username = ?`,
      [siteUsername]
    );

    if ((rows as any[]).length === 0) {
      await connection.execute(
        `INSERT INTO users (username, password, role) VALUES (?, ?, 'ADMIN')`,
        [siteUsername, hashedPassword]
      );
    }

    return NextResponse.json({ message: 'Admin setup completed successfully!' , status: 200 });

  } catch (error) {
    console.error('Error reading or writing database.json', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
