const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profiles');
const post = require('./routes/api/post');

const app = express();

//db config
const db = require('./config/keys').mongoURI;

//connect to db
mongoose
.connect(db)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.get('/', (req,res) => {
  res.send('Hello!');
});

app.use('/api/users',users);
app.use('/api/profiles',profile);
app.use('/api/post',post);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));