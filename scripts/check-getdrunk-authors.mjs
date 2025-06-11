import { MongoClient } from 'mongodb';
import 'dotenv/config';

// Get MongoDB connection details from environment variables
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri || !dbName) {
  console.error('MongoDB credentials not found in environment variables. Please check your .env file.');
  process.exit(1);
}

async function checkGetdrunkAuthors() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    
    const db = client.db(dbName);
    
    // Get all experiences with getdrunk hashtag
    const experiences = await db.collection('experiences')
      .find({ $or: [{ hashtags: "getdrunk" }, { isGetdrunk: true }] })
      .toArray();
      
    console.log(`Found ${experiences.length} experiences with getdrunk hashtag`);
    
    // Count occurrences of each username
    const usernameCounts = {};
    experiences.forEach(exp => {
      const username = exp.username;
      usernameCounts[username] = (usernameCounts[username] || 0) + 1;
    });
    
    // Sort usernames by number of posts (descending)
    const sortedUsernames = Object.entries(usernameCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([username, count]) => ({ username, count }));
    
    console.log('\nAuthors of getdrunk experiences:');
    console.log('------------------------------');
    sortedUsernames.forEach((item, index) => {
      console.log(`${index + 1}. Username: ${item.username}, Posts: ${item.count}`);
    });
    
    // Get total number of unique authors
    console.log(`\nTotal unique authors: ${sortedUsernames.length}`);
    
    // Fetch a sample experience for each of the top 3 authors
    console.log('\nSample experiences from top authors:');
    for (let i = 0; i < Math.min(3, sortedUsernames.length); i++) {
      const author = sortedUsernames[i];
      const sampleExp = await db.collection('experiences')
        .findOne({ username: author.username });
      
      console.log(`\nAuthor: ${author.username} (${author.count} posts)`);
      console.log(`Title: ${sampleExp.title}`);
      console.log(`Venue: ${sampleExp.venue}`);
      console.log(`Likes: ${sampleExp.likes}`);
      if (sampleExp.hashtags && sampleExp.hashtags.length > 0) {
        console.log(`Hashtags: ${sampleExp.hashtags.join(', ')}`);
      }
    }
    
  } catch (error) {
    console.error('Error checking authors:', error);
  } finally {
    await client.close();
    console.log('\nMongoDB connection closed');
  }
}

checkGetdrunkAuthors(); 