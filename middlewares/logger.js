const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');

const logger = (req, res, next) => {
  const datetime = format(new Date(), 'yyyy/MM/dd\tHH:mm:ss');
  const logItem = `${datetime}\t${req.method}\t${req.url}\n`;
  fs.appendFileSync(path.join(__dirname, '..', 'data', 'logs.txt'), logItem);
  next();
};

module.exports = logger;
