import dotenv from 'dotenv';
import { app } from 'electron';
import path from 'path';

// Load .env file - in packaged app, it's in resources, in dev it's in project root
const isPackaged = app.isPackaged;
const envPath = isPackaged
  ? path.join(process.resourcesPath, 'production.env')
  : path.join(__dirname, '../../production.env');

dotenv.config({ path: envPath });

export const config = {
  databaseUri: process.env.DATABASE_URI || '',
};
