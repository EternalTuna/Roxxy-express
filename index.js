const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false
}));

// Handle GET request to /login
app.get('/login', function(req, res) {
  res.render('login', { error: req.session.loginError });
});

// Handle POST request to /login
app.post('/login', function(req, res) {
  const { username, password } = req.body;
  // Check if username and password are correct
  if (username === 'myusername' && password === 'mypassword') {
    req.session.isLoggedIn = true;
    res.redirect('/');
  } else {
    req.session.loginError = 'invalid username or password.';
    res.redirect('/login');
  }
});

// Serve signup page
app.get('/signup', function(req, res) {
  res.render('signup', { currentPage: 'signup' });
});

// Handle signup form sub
app.post('/signup', function(req, res) {
  // Get the submitted username and password
  const { username, password } = req.body;

  // Create a new user obj with usrname and password
  const user =  { username, password };

  // Add the new user to the users array
  users.push(user);

  // Set the isLoggedIn session var to true
  req.session.isLoggedIn = true;

  // Redirect the user to the home page
  res.redirect('/');
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});