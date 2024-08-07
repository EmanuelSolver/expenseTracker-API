require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors')
const routes = require('./src/routes/routes.js'); // Import your auth routes

const app = express();
app.use(cors())

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'secretKey',
  resave: false,
  saveUninitialized: true,
}));

// routes 
routes(app);

app.get('/', (req, res) => {
    res.send("Welcome to ExpenseTracker API!");
});

const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
