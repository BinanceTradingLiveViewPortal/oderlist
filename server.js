const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve the script.js file
app.use('/script.js', express.static(path.join(__dirname, 'script.js')));

// A basic route for testing
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
