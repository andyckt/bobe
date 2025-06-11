import { MongoClient } from 'mongodb';
import 'dotenv/config';

// Get MongoDB connection details from environment variables
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri || !dbName) {
  console.error('MongoDB credentials not found in environment variables. Please check your .env file.');
  process.exit(1);
}

async function findGetdrunkPosts() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    
    const db = client.db(dbName);
    
    // Find posts with "getdrunk" hashtag
    const posts = await db.collection('posts')
      .find({ hashtags: "getdrunk" })
      .toArray();
      
    console.log(`Found ${posts.length} posts with hashtag "getdrunk"`);
    
    if (posts.length > 0) {
      // Display sample posts
      posts.slice(0, 3).forEach((post, index) => {
        console.log(`\nPost #${index + 1}:`);
        console.log(JSON.stringify({
          _id: post._id,
          title: post.title,
          description: post.description,
          hashtags: post.hashtags,
          username: post.username,
          likes: post.likes,
          taggedAccounts: post.taggedAccounts,
          media: post.media?.length ? `${post.media.length} media items` : 'No media'
        }, null, 2));
      });
      
      // Just print IDs of remaining posts if there are more than 3
      if (posts.length > 3) {
        console.log(`\nRemaining post IDs: ${posts.slice(3).map(p => p._id).join(', ')}`);
      }
    }
    
    // Also check if there are any posts with hashtags containing "getdrunk" (case insensitive)
    const regexPosts = await db.collection('posts')
      .find({ hashtags: { $regex: /getdrunk/i } })
      .toArray();
      
    if (regexPosts.length !== posts.length) {
      console.log(`\nFound ${regexPosts.length} posts with case-insensitive "getdrunk" hashtag`);
      
      // Find the posts that were found with regex but not exact match
      const extraPosts = regexPosts.filter(regexPost => 
        !posts.some(post => post._id.toString() === regexPost._id.toString())
      );
      
      if (extraPosts.length > 0) {
        console.log('\nAdditional posts found with case-insensitive match:');
        extraPosts.forEach((post, index) => {
          console.log(`Post #${index + 1}: ${post._id} - Hashtags: ${post.hashtags.join(', ')}`);
        });
      }
    }
    
  } catch (error) {
    console.error('Error finding posts:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

findGetdrunkPosts(); 