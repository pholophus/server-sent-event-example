// client.mjs

import fetch from 'node-fetch';

async function startBackgroundTask() {
  try {
    const response = await fetch('http://localhost:3000/start-background-task', {
      method: 'POST',
    });

    // Check if the response status is OK (200)
    if (response.ok) {
      const result = await response.json();
      console.log("Success:", result.message);
    } else {
      // Handle the error response
      const errorResponse = await response.json();
      console.error("Error:", errorResponse.error);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}

// Call the function to start the background task
startBackgroundTask();
