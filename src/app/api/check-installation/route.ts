import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// Path to your configuration file
const configFilePath = path.resolve('./config', 'database.json');


export async function GET() {  
        // Check if the configuration file exists
        const isInstalled = fs.existsSync(configFilePath);

        // Respond with a boolean indicating installation status
       return Response.json({ isInstalled });

}

