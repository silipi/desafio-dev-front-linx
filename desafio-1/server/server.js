const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(cors());

const token = 'AAAAAAAAAAAAAAAAAAAAAIqfJQEAAAAAlzbtO0ijErIRjw4YNUf8TSO6ktQ%3D9qd8V6Ix8YIYtSfOW9Ov4gvHZydmzLPED0PTXItTLEMqApE6ul';

app.post("/api/hashtag", (request, response) => {
  const hashtag = request.body.hashtag;

  axios({
    url: `https://api.twitter.com/1.1/search/tweets.json?q=%23${hashtag}&result_type=popular`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }).then(res => response.json(res.data.statuses)); 
});

app.listen(3001, () => console.log(`Servidor executando!`));