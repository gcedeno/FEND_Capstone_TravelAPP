// Dependencies for Server Configuration
// Require Express to run server and routes
const express = require('express')
const app = express()

app.use(express.static('dist'));

app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
})
// Get port from environment otherwise fallback to port 3000
const PORT = process.env.PORT || 8081//3000

app.listen(PORT, async () => {
    console.log(`The server is runing on http://localhost:${PORT}`);
})

//for testing
const sum = (a, b) => {
  return a + b;
}

module.exports = sum; 