// lib/db.ts
import { createConnection } from 'mysql2/promise';
import { promises as fs } from 'fs';
import path from 'path';

const dbFilePath = path.join(process.cwd(), 'config', 'database.json');

async function getConnection() {
  try {
    // Read the database configuration from the JSON file
    const dbFile = await fs.readFile(dbFilePath, 'utf-8');
    const dbConfig = JSON.parse(dbFile);

    // Create and return a new database connection
    const connection = await createConnection(dbConfig);
    return connection;
  } catch (error) {
    console.error('Error reading database config or connecting to the database', error);
    throw new Error('Database connection failed');
  }
}

export default getConnection;
