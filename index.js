const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const logger = require('./middlewares/logger');
const { addUser, getUsers } = require('./models/users.js');
const port = 3000;

// custom logging middleware
app.use(logger);

// third-party middleware to handle cors
app.use(cors());

// built-in middleware to handle urlecoded data - forms data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/api/users', require('./routes/api/users'));

app.post('/signup', (req, res) => {
  console.log('User created successfully');
  addUser(req.body);
  res.send('User created successfully ');
});

app.get('/login', async (req, res) => {
  const users = await getUsers();
  let userId = 'f8ab2bfa-7048-404f-a916-778c3ab3fb2d';
  res.send(users.filter((user) => user.id == userId)[0]);
});

// 404 handler
app.get('/*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Specifying the port of the server
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
