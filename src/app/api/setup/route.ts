import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

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

    return NextResponse.json({ message: 'Admin setup completed successfully!' , status: 200 });

  } catch (error) {
    console.error('Error reading or writing database.json', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
