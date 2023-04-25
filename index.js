const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const app = express();
app.use(cors());
const io = require('socket.io')(4000, {
  cors: {
    methods: ['GET', 'POST'],
  },
});

let sessions = 0;

io.on('connection', socket => {
  sessions++;
  console.log('Client connected');
  io.emit('update sessions', sessions);

  socket.on('disconnect', () => {
    sessions--;
    console.log('Client disconnected');
    io.emit('update sessions', sessions);
  });
});

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
