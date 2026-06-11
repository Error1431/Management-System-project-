const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
const defaultMongoUri = 'mongodb://127.0.0.1:27017/student_management';
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDatabase = async () => {
  const primaryUri = process.env.MONGODB_URI || defaultMongoUri;

  try {
    await mongoose.connect(primaryUri, connectionOptions);
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.log('MongoDB Connection Error:', error.message);

    if (primaryUri !== defaultMongoUri && process.env.NODE_ENV !== 'production') {
      try {
        await mongoose.connect(defaultMongoUri, connectionOptions);
        console.log('MongoDB Connected Successfully using local fallback');
      } catch (fallbackError) {
        console.log('MongoDB Local Fallback Error:', fallbackError.message);
      }
    }
  }
};

connectDatabase();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/students', require('./routes/students'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/grades', require('./routes/grades'));
app.use('/api/attendance', require('./routes/attendance'));

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
