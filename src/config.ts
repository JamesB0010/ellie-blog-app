import dotenv from 'dotenv';

dotenv.config({ path: './production.env' });

export const config = {
  databaseUri: process.env.DATABASE_URI || '',
};
