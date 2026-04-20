import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { connectToMongo } from './db/mongo.js';
import productsRouter from './routes/products.routes.js';
import ordersRouter from './routes/orders.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// --- PASSPORT & SESSION CONFIGURATION ---
// No CORS library or headers used here.
app.use(
  session({
    secret: 'sweetie-bakery-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Must be false for local localhost/http testing
      sameSite: 'lax',
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy((username, password, done) => {
    if (username === 'admin' && password === 'admin123') {
      return done(null, { id: '1', username: 'admin' });
    }
    return done(null, false, { message: 'Incorrect credentials.' });
  })
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => done(null, { id: '1', username: 'admin' }));

// LOGIN ROUTE
app.post('/api/login', passport.authenticate('local'), (req, res) => {
  res.json({ username: req.user.username });
});

// HEALTH CHECK
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ROUTES
app.use('/api/products', productsRouter);

// Protect orders: Staff can see/edit, but we need to allow public POSTing for customers
// We'll handle the specific route protection inside the orders.routes.js file instead
app.use('/api/orders', ordersRouter);

const startServer = async () => {
  try {
    await connectToMongo(process.env.MONGODB_URI, process.env.DB_NAME);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
  }
};

startServer();