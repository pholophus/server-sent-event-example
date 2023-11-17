const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();

function longRunningService() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const error = true; // Set to true to simulate an error
      if (error) {
        reject(new Error("Error in the long-running service"));
      } else {
        resolve("Service completed successfully!");
      }
    }, 2000);
  });
}

// Use the cors middleware
app.use(cors());

app.get('/start-background-task', (req, res) => {
  // Set up Server-Sent Events
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Send an initial event to acknowledge the request
  res.write('data: Background task started successfully.\n\n');

  // Start the long-running service asynchronously
  longRunningService()
    .then((result) => {
      console.log("Background Task Result:", result);
      // Send a success event to the client if needed
      res.write(`data: ${result}\n\n`);
    })
    .catch((error) => {
      console.error("Background Task Error:", error);
      // Send an error event to the client
      res.write(`event: error\ndata: ${error.message}\n\n`);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
