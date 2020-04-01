const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const User = require('./api/models/userModel');
const userRoutes    = require('./api/routes/userRoutes');
const Fish       = require('./api/models/fishModel');
const fishRoutes = require('./api/routes/fishRoutes');
const hostname = '127.0.0.1';
const port = 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://titi:test@localhost:27017/ipssi2019', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
)
  .then(() => {
    console.log('MongoDB connection success');
  });
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

userRoutes(app);
fishRoutes(app);

app.listen(port, hostname);
