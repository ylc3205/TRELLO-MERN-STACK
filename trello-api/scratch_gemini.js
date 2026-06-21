const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function run() {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(process.env.DATABASE_NAME);
    const users = await db.collection('users').find({}).toArray();
    users.forEach(u => console.log({ _id: u._id, email: u.email, displayName: u.displayName }));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

run();
