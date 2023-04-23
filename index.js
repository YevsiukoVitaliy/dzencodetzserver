const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

// Connect to MongoDB
mongoose.connect(
  'mongodb+srv://qwerty:123456qwerty@atlascluster.awhjosh.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true }
);
mongoose.connection.on(
  'error',
  console.error.bind(console, 'MongoDB connection error:')
);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use routes
app.use('/', routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
