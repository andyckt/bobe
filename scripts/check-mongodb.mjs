import { MongoClient } from 'mongodb';

// Hardcoded credentials for testing purposes
const uri = 'mongodb+srv://bobe:olyb2dtR3XUeTYkM@bobe.ykxkvdi.mongodb.net/bobe?retryWrites=true&w=majority&appName=bobe';
const dbName = 'bobe';

async function checkCollections() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    
    const db = client.db(dbName);
    
    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('Collections in the database:');
    collections.forEach((collection, index) => {
      console.log(`${index + 1}. ${collection.name}`);
    });
    
    // If there's an experiences collection, check its structure
    if (collections.some(col => col.name === 'experiences')) {
      const exampleDoc = await db.collection('experiences').findOne({});
      if (exampleDoc) {
        console.log('\nExample document from experiences collection:');
        console.log(JSON.stringify(exampleDoc, null, 2));
      } else {
        console.log('\nNo documents found in experiences collection');
      }
    } else {
      console.log('\nNo experiences collection found. You may need to create it.');
      
      // List all collections and sample documents
      for (const collection of collections) {
        const sampleDoc = await db.collection(collection.name).findOne({});
        if (sampleDoc) {
          console.log(`\nSample document from ${collection.name} collection:`);
          console.log(JSON.stringify(sampleDoc, null, 2));
        }
      }
    }
    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

checkCollections(); 