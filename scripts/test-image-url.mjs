import fetch from 'node-fetch';

// Sample URL from our database examination
const imageUrl = "https://res.cloudinary.com/dzmaishhi/image/upload/c_limit,f_auto,fl_progressive,q_80,w_800/v1/media/2024-04-05_10_22-8e162a19-f7a0-4553-92ad-404f3d5a7a1b?_a=BAMABkWO0";

async function testImageUrl() {
  try {
    console.log(`Testing URL: ${imageUrl}`);
    
    const response = await fetch(imageUrl, {
      method: 'HEAD',
    });
    
    console.log(`Status: ${response.status}`);
    console.log(`Status Text: ${response.statusText}`);
    
    if (response.ok) {
      console.log('Image URL is accessible!');
      console.log('Content-Type:', response.headers.get('content-type'));
      console.log('Content-Length:', response.headers.get('content-length'));
    } else {
      console.log('Image URL is not accessible!');
    }
    
    // Try a simpler URL without query parameters
    const simplifiedUrl = imageUrl.split('?')[0];
    console.log(`\nTesting simplified URL (without query params): ${simplifiedUrl}`);
    
    const response2 = await fetch(simplifiedUrl, {
      method: 'HEAD',
    });
    
    console.log(`Status: ${response2.status}`);
    console.log(`Status Text: ${response2.statusText}`);
    
    if (response2.ok) {
      console.log('Simplified URL is accessible!');
      console.log('Content-Type:', response2.headers.get('content-type'));
      console.log('Content-Length:', response2.headers.get('content-length'));
    } else {
      console.log('Simplified URL is not accessible!');
    }
    
  } catch (error) {
    console.error('Error testing URL:', error.message);
  }
}

testImageUrl(); 