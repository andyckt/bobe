import { MongoClient, ObjectId } from 'mongodb';
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

async function examineUserAvatars() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    
    const db = client.db(DB_NAME);
    
    // Get a few users with profile images
    const users = await db.collection('users')
      .find({ profileImage: { $exists: true } })
      .limit(5)
      .toArray();
    
    if (users.length === 0) {
      console.log('No users with profile images found');
      return;
    }
    
    console.log(`Found ${users.length} users with profile images`);
    
    // Examine each user's profile image
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      console.log(`\nUser ${i+1}: ${user.displayName || user.username}`);
      
      // Check the structure of the profile image
      console.log('Profile image structure:');
      
      if (typeof user.profileImage === 'string') {
        console.log(`profileImage is a string: ${user.profileImage}`);
      } else if (typeof user.profileImage === 'object') {
        console.log('profileImage is an object:');
        console.log(JSON.stringify(user.profileImage, null, 2));
        
        // Check for known fields
        if (user.profileImage.original) {
          console.log('- Has original URL');
        }
        if (user.profileImage.media) {
          console.log('- Has media URL');
        }
        if (user.profileImage.micro) {
          console.log('- Has micro URL');
        }
      } else {
        console.log(`profileImage is type: ${typeof user.profileImage}`);
      }
      
      // Look for alternative profile image fields
      const possibleAvatarFields = [
        'avatar', 
        'avatarUrl', 
        'profilePicture', 
        'profileImageUrl',
        'userAvatar'
      ];
      
      for (const field of possibleAvatarFields) {
        if (user[field]) {
          console.log(`Found alternate field: ${field}`);
          console.log(user[field]);
        }
      }
    }
    
    // Check for the specific user with username "incadenza"
    console.log('\nLooking for user "incadenza":');
    const specificUser = await db.collection('users')
      .findOne({ username: "incadenza" });
    
    if (specificUser) {
      console.log('Found user:', specificUser.displayName);
      console.log('Profile image:');
      console.log(JSON.stringify(specificUser.profileImage, null, 2));
    } else {
      console.log('User "incadenza" not found');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
    console.log('\nMongoDB connection closed');
  }
}

examineUserAvatars(); 