const express = require('express');
const app = express();
const path = require('path');
const logger = require('./middlewares/logger');
const port = 3000;

// built-in middleware to handle urlecoded data - forms data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// custom logging middleware
app.use(logger);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Chaining router handler
const one = (req, res, next) => {
  console.log('one');
  next();
};

const two = (req, res, next) => {
  console.log('two');
  next();
};

const three = (req, res) => {
  console.log('three');
  res.send('Finished');
};

app.get('/chain', [one, two, three]);

// Transferring files to client
app.get('/download', (req, res) => {
  res.download(path.join(__dirname, 'data', 'messages.txt'));
});

// 404 handler
app.get('/*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Specifying the port of the server
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
