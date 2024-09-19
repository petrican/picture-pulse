import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
    try {
        const { dbHost, dbPort, dbName, dbUser, dbPassword } = await request.json();

        // Prepare connection configuration
        const connectionConfig = {
            host: dbHost || '127.0.0.1',
            port: parseInt(dbPort, 10) || 3306, // Default port if not provided
            database: dbName,
            user: dbUser,
            password: dbPassword,
        };

        // Define the path to the configuration file
        const configFilePath = path.resolve('./config', 'database.json');

        // Ensure the directory exists
        const configDir = path.dirname(configFilePath);
        if (!fs.existsSync(configDir)) {
            fs.mkdirSync(configDir, { recursive: true });
        }

        let connection;

        try {
            // Attempt to connect to the MySQL database
            connection = await mysql.createConnection(connectionConfig);
            await connection.end(); // Close the connection after checking

            // Prepare the data to be written to the file
            const configData = JSON.stringify({ dbHost, dbPort, dbName, dbUser, dbPassword, adminSet: false }, null, 2);

            // Write the data to the file
            fs.writeFileSync(configFilePath, configData, 'utf8');

            return NextResponse.json({ message: 'Database connection verified and saved successfully' }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ error: 'Failed to connect to the database' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error handling request:', error);
        return NextResponse.json({ error: 'Failed to process the request' }, { status: 500 });
    }
}
