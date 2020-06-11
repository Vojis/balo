const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
require('colors');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');

// Load env variables
dotenv.config({ path: './config/config.env' });

// connect to DB
connectDB();

const userRoutes = require('./c_users/userRoutes');
const collectionRoutes = require('./c_collections/collectionRoutes');
const pairRoutes = require('./c_pairs/pairRoutes');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

// Mount routers
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/collections', collectionRoutes);
app.use('/api/v1/pairs', pairRoutes);

// Error Handler middleware
app.use(errorHandler);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.cyan.inverse));

// Hanlde unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
