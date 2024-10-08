const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const tripsRouter = require('./routes/trips.router');
const newTripRouter = require('./routes/newtrip.router');
const paddlersRouter = require('./routes/paddlers.router');
const gearListRouter = require('./routes/gearlist.router');
const mealListRouter = require('./routes/meallist.router');

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/trips', tripsRouter);
app.use('/api/newtrip', newTripRouter);
app.use('/api/paddlers', paddlersRouter);
app.use('/api/gearlist', gearListRouter);
app.use('/api/meallist', mealListRouter);

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
