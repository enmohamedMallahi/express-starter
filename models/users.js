const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;
const { v4: uuid } = require('uuid');

const p = path.join(__dirname, '..', 'data', 'users.json');

const addUser = async (newUser) => {
  const users = await getUsers();

  users.push({
    ...newUser,
    id: uuid(),
  });

  fs.writeFile(p, JSON.stringify(users), (err) => {
    if (err) console.log(err);
  });
};

const getUsers = async () => {
  const rawUsers = await fsPromises.readFile(p, 'utf8');
  const users = JSON.parse(rawUsers);
  return users;
};

// const findUser = async (userId) => {
//   const rawUsers = await fsPromises.readFile(p, 'utf8');
//   const users = JSON.parse(rawUsers);
//   // console.log('id', userId);
//   const foundUser = await users.filter((user) => user.id == userId)[0];
//   console.log(users.filter((user) => user.id == userId)[0]);
// };

module.exports = { addUser, getUsers };
