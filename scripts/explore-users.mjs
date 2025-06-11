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

async function exploreUsers() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    
    const db = client.db(DB_NAME);
    
    // Check if users collection exists
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);
    
    // Try different collection names for users
    const possibleCollections = ['users', 'accounts', 'profiles'];
    
    for (const collectionName of possibleCollections) {
      if (collectionNames.includes(collectionName)) {
        console.log(`\nExamining ${collectionName} collection:`);
        
        // Get the first 10 documents
        const users = await db.collection(collectionName)
          .find({})
          .limit(10)
          .toArray();
        
        console.log(`Found ${users.length} documents in ${collectionName}`);
        
        if (users.length > 0) {
          // Show the structure of the first user
          console.log('\nFirst document structure:');
          const firstUser = users[0];
          
          // Print keys and their types
          Object.keys(firstUser).forEach(key => {
            const value = firstUser[key];
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
          
          // Check if there's a field that might be a display name
          const possibleDisplayNameFields = ['displayName', 'name', 'fullName', 'profileName'];
          
          for (const field of possibleDisplayNameFields) {
            if (firstUser[field]) {
              console.log(`\nPossible display name field found: ${field}`);
              break;
            }
          }
          
          // Show the first few users with important fields
          console.log('\nSample users (showing key fields only):');
          users.slice(0, 5).forEach((user, index) => {
            const userSummary = {
              _id: user._id,
              username: user.username,
              name: user.name,
              displayName: user.displayName,
              email: user.email ? '(redacted for privacy)' : undefined,
              // Add other important fields as needed
            };
            
            console.log(`\nUser ${index + 1}:`);
            console.log(JSON.stringify(userSummary, null, 2));
          });
          
          // Look specifically for the user with username "66" or ID matching the one we saw before
          console.log('\nLooking for specific user with username "66" or similar:');
          const specificUser = await db.collection(collectionName)
            .find({ 
              $or: [
                { username: "66" },
                { username: "incadenza" }
              ]
            })
            .limit(1)
            .toArray();
          
          if (specificUser.length > 0) {
            console.log('Found specific user:');
            const userSummary = {
              _id: specificUser[0]._id,
              username: specificUser[0].username,
              name: specificUser[0].name,
              displayName: specificUser[0].displayName,
              // Add other important fields as needed
            };
            console.log(JSON.stringify(userSummary, null, 2));
          } else {
            console.log('Specific user not found in this collection');
          }
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

exploreUsers(); 