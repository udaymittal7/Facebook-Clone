// packages
const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cors = require('cors');

// routes
const authRoute = require('./routes/auth/authRoutes');
const userRoute = require('./routes/user/userRoutes');
const postRoute = require('./routes/post/postRoutes');

// database connection
const connectDB = require('./db');

// intializing express
const app = express();

dotenv.config();

const PORT = process.env.PORT || 7000;

// Database
connectDB();

// middlewares
app.use(express.json({ extended: false }));

app.use(cors());

app.use(helmet());

// routes
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
