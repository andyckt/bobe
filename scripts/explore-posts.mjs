import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable');
  process.exit(1);
}

if (!DB_NAME) {
  console.error('Please define the MONGODB_DB environment variable');
  process.exit(1);
}

async function explorePosts() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    
    const db = client.db(DB_NAME);
    
    // Check if posts collection exists
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);
    console.log('Available collections:', collectionNames);
    
    // Try different collection names for posts
    const possibleCollections = ['posts', 'experiences', 'stories'];
    
    for (const collectionName of possibleCollections) {
      if (collectionNames.includes(collectionName)) {
        console.log(`\nExamining ${collectionName} collection:`);
        
        // Get the first 10 documents
        const posts = await db.collection(collectionName)
          .find({})
          .limit(10)
          .toArray();
        
        console.log(`Found ${posts.length} documents in ${collectionName}`);
        
        if (posts.length > 0) {
          // Show the structure of the first post
          console.log('\nFirst document structure:');
          const firstPost = posts[0];
          
          // Print keys and their types
          Object.keys(firstPost).forEach(key => {
            const value = firstPost[key];
            console.log(`- ${key}: ${typeof value} ${Array.isArray(value) ? '(Array)' : ''}`);
            
            // If it's an array and has items, show the first item's type
            if (Array.isArray(value) && value.length > 0) {
              console.log(`  First item type: ${typeof value[0]}`);
              // If the first item is an object, show its keys
              if (typeof value[0] === 'object' && value[0] !== null) {
                console.log(`  First item keys: ${Object.keys(value[0]).join(', ')}`);
              }
            }
          });
          
          // Show the first document with some fields truncated for readability
          console.log('\nSample document (truncated):');
          const simplifiedPost = { ...firstPost };
          
          // Truncate arrays to show only first item
          Object.keys(simplifiedPost).forEach(key => {
            if (Array.isArray(simplifiedPost[key]) && simplifiedPost[key].length > 1) {
              simplifiedPost[key] = [simplifiedPost[key][0], `... (${simplifiedPost[key].length - 1} more items)`];
            }
          });
          
          console.log(JSON.stringify(simplifiedPost, null, 2));
        }
      }
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
    console.log('\nMongoDB connection closed');
  }
}

explorePosts(); 