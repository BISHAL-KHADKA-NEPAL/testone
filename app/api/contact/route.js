// app/api/contact/route.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(req) {
  const { name, email, company, message } = await req.json();

  try {
    await client.connect();
    const db = client.db('mydatabase'); // Replace 'mydatabase' with your database name
    const collection = db.collection('messages'); // Replace 'messages' with your collection name

    const result = await collection.insertOne({
      name,
      email,
      company,
      message,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to save message' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } finally {
    await client.close();
  }
}
