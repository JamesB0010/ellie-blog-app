import dotenv from 'dotenv';
import { app } from 'electron';
import path from 'path';

// Load .env from the app resources directory
const envPath = path.join(app.getAppPath(), 'production.env');
dotenv.config({ path: envPath });

export const config = {
  databaseUri: process.env.DATABASE_URI || '',
};
