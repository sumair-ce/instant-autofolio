const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('[db:init] DATABASE_URL is missing in your environment.');
  process.exit(1);
}

const isLocalDatabase =
  databaseUrl.includes('localhost') ||
  databaseUrl.includes('127.0.0.1');

const client = new Client({
  connectionString: databaseUrl,
  ssl: isLocalDatabase ? false : { rejectUnauthorized: false },
});

const schemaPath = path.join(__dirname, '..', 'src', 'db', 'schema.sql');
const schemaSql = fs.readFileSync(schemaPath, 'utf8');

async function main() {
  try {
    await client.connect();
    await client.query(schemaSql);
    console.log('[db:init] Database tables created successfully.');
  } catch (error) {
    console.error('[db:init] Failed to initialize database.');
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await client.end().catch(() => {});
  }
}

main();
