import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

const configFilePath = path.resolve('./config', 'database.json');

const readConfig = (): { [key: string]: string | boolean } => {
  const configFile = fs.readFileSync(configFilePath, 'utf-8');
  return JSON.parse(configFile);
};

let connection: mysql.Connection | null = null;

const createConnection = async () => {
  if (connection) {
    return connection;
  }

  const config = readConfig();

  const connectionConfig = {
    host: String(config.dbHost), 
    port: Number(config.dbPort), 
    user: String(config.dbUser), 
    password: String(config.dbPassword), 
    database: String(config.dbName), 
  };

  connection = await mysql.createConnection(connectionConfig);

  return connection;
};


const runQuery = async <T>(query: string, values: any[]): Promise<T[]> => {
  try {
    const conn = await createConnection();
    const [results] = await conn.execute(query, values);
    return results as T[];
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

const closeConnection = async () => {
  if (connection) {
    await connection.end();
    connection = null;
  }
};

export { runQuery, closeConnection };
