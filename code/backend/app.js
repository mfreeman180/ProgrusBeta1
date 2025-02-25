const express = require('express');
const session = require('express-session');
const Sequelize = require('sequelize');
const sequelize = require('./config/database');
const app = express();

console.log('Starting backend...');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true }
}));

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'ProgrUS Backend API is running', version: '1.0.0' });
});


try {
  console.log('Loading /auth routes');
  const authRoutes = require('./routes/auth');
  app.use('/auth', authRoutes);

  console.log('Loading /api routes');
  app.use('/api', require('./routes/posts'));

  console.log('Loading /admin routes');
  app.use('/admin', require('./routes/admin'));
} catch (err) {
  console.error('Error loading routes:', err);
  process.exit(1);
}

sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection failed:', err));

const PORT = 5000;
app.listen(PORT, (err) => {
  if (err) {
    console.error('Server failed to start:', err);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});