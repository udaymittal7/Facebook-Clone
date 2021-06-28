// packages
const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

// routes
const authRoute = require('./routes/auth/authRoutes');
const userRoute = require('./routes/user/userRoutes');
const postRoute = require('./routes/post/postRoutes');
const storyRoute = require('./routes/story/storyRoutes');

// database connection
const connectDB = require('./db');

// intializing express
const app = express();

dotenv.config();

const PORT = process.env.PORT || 7000;

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

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
