const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('✅ This test server works!');
});

app.listen(5000, () => {
  console.log('✅ Test server running at http://localhost:5000');
});
