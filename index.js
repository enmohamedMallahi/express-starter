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
app.use('/api/todos', require('./routes/api/todos'));
app.use('/register', require('./routes/register'));

// 404 handler
app.get('/*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Specifying the port of the server
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
