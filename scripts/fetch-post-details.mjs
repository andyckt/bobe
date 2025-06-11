import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config';

// Get MongoDB connection details from environment variables
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri || !dbName) {
  console.error('MongoDB credentials not found in environment variables. Please check your .env file.');
  process.exit(1);
}

// Post ID to fetch
const POST_ID = '68257b59e783820b570df9f1';

async function fetchPostDetails() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    
    const db = client.db(dbName);
    
    // Fetch the post from posts collection
    const post = await db.collection('posts').findOne({ _id: new ObjectId(POST_ID) });
    
    if (!post) {
      console.log(`No post found with ID: ${POST_ID}`);
      return;
    }
    
    console.log('\nPost Details:');
    console.log('=============');
    console.log(JSON.stringify(post, null, 2));
    
    // Fetch associated media if available
    if (post.media && post.media.length > 0) {
      console.log('\nMedia Details:');
      console.log('=============');
      
      for (const mediaItem of post.media) {
        const media = await db.collection('media').findOne({ _id: new ObjectId(mediaItem.mediaId) });
        if (media) {
          console.log(`\nMedia ID: ${mediaItem.mediaId}`);
          console.log(`Position: ${mediaItem.position}`);
          console.log(`Is Primary: ${mediaItem.isPrimary}`);
          console.log(`Type: ${media.type}`);
          console.log(`Width × Height: ${media.width} × ${media.height}`);
          console.log(`Aspect Ratio: ${media.aspectRatio}`);
          
          // Print URLs for the different image variants
          if (media.variants) {
            console.log('\nImage Variants:');
            Object.entries(media.variants).forEach(([key, variant]) => {
              console.log(`- ${key}: ${variant.url} (${variant.width}×${variant.height})`);
            });
          }
        }
      }
    }
    
    // Fetch user information if available
    if (post.userId) {
      const user = await db.collection('users').findOne({ _id: new ObjectId(post.userId) });
      if (user) {
        console.log('\nAuthor Details:');
        console.log('==============');
        console.log(`User ID: ${post.userId}`);
        console.log(`Username: ${user.username || post.username}`);
        console.log(`Display Name: ${user.displayName || 'N/A'}`);
        console.log(`Profile Image: ${user.profileImage || 'N/A'}`);
        console.log(`Bio: ${user.bio || 'N/A'}`);
      }
    }
    
    // Fetch venue information if available
    if (post.taggedAccounts && post.taggedAccounts.length > 0) {
      console.log('\nTagged Venues:');
      console.log('=============');
      
      for (const account of post.taggedAccounts) {
        console.log(`- ${account.username} (${account.accountType})`);
        
        // Try to find more details about the venue from merchants collection
        const merchant = await db.collection('merchants').findOne({ username: account.username });
        if (merchant) {
          console.log(`  Display Name: ${merchant.displayName || 'N/A'}`);
          if (merchant.location) {
            console.log(`  Address: ${merchant.location.englishAddress || 'N/A'}`);
            console.log(`  District: ${merchant.location.branchDistrict || 'N/A'}`);
          }
        }
      }
    }
    
  } catch (error) {
    console.error('Error fetching post details:', error);
  } finally {
    await client.close();
    console.log('\nMongoDB connection closed');
  }
}

fetchPostDetails(); 