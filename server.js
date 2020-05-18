const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
require('colors');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');

// Load env variables
dotenv.config({ path: './config/config.env' });

// connect to DB
connectDB();

const userRoutes = require('./c_users/userRoutes');
const collectionRoutes = require('./c_collections/collectionRoutes');

const app = express();
app.use(express.json());
app.use(cookieParser());

// Mount routers
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/collections', collectionRoutes);

// Error Handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.cyan.inverse));

// Hanlde unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
