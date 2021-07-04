// packages
const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

// intializing express
const app = express();

// socket io
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

// routes
const authRoute = require('./routes/auth/authRoutes');
const userRoute = require('./routes/user/userRoutes');
const postRoute = require('./routes/post/postRoutes');
const storyRoute = require('./routes/story/storyRoutes');
const messageRoute = require('./routes/chat/messageRoutes');
const conversationRoute = require('./routes/chat/conversationRoutes');

// database connection
const connectDB = require('./db');

// environment variable
dotenv.config();

// Database
connectDB();

// middlewares
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use(express.json({ extended: false }));

app.use(cors());

app.use(helmet());

app.use(morgan('common'));

// routes
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);
app.use('/api/story', storyRoute);
app.use('/api/messages', messageRoute);
app.use('/api/conversations', conversationRoute);

// undefined route
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Could not find ${req.url}`,
  });
});

// socket io
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  console.log(users);
  return users.find((user) => {
    console.log(user, user.userId, userId, user.userId === userId);
    user.userId === userId;
  });
};

io.on('connection', (socket) => {
  //when ceonnect
  console.log('a user connected.');

  //take userId and socketId from user
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    io.emit('getUsers', users);
  });

  //send and get message
  socket.on('sendMessage', ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    console.log(user);
    io.to(user.socketId).emit('getMessage', {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on('disconnect', () => {
    console.log('a user disconnected!');
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});

const PORT = process.env.PORT || 7000;

server.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
