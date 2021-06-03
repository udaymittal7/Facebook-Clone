const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cors = require('cors');

// const userRoute = require('./routes/userRoutes');
const authRoute = require('./routes/auth/authRoutes');
// const postRoute = require('./routes/postRoutes');
const connectDB = require('./db');

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

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
