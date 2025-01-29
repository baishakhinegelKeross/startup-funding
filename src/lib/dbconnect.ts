import { MongoClient } from "mongodb";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export default async function DBCollectionAccess(collectionName: string, callback: Function | null) {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not set.");
  }

  const client = new MongoClient(uri);

  try {
    // Connect to the database
    await client.connect();
    console.log("Connected to MongoDB.");

    // Access the database and collection
    const db = client.db(); // Defaults to the database in the URI
    const usersCollection = db.collection(collectionName);

    // Perform a simple query to check access
    const user = await usersCollection.findOne();
    console.log("Successfully accessed 'Users' collection.");
    console.log("Sample document:", user);

    if(callback){
        callback(usersCollection);
    }

  } catch (error) {
        if (error instanceof Error) {
            console.error(`Error accessing ${collectionName} collection:`, error.message); // Safely access error.message
        }   else {
            console.log(String(error)); // Handle non-standard throws safely
        }
  } finally {
    // Ensure the client is closed
    await client.close();
    console.log("Connection closed.");
  }
}

