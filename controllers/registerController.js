const userDB = {
  users: require('../models/users'),
  setUsers: (data) => (this.users = data),
};

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: 'Email and password are required.' });
  const duplicate = userDB.users.find((user) => user.email === email);
  if (duplicate)
    return res.status(409).json({ message: 'User already exists.' });
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: userDB.users[userDB.users.length - 1].id + 1,
      email,
      password,
    };
    userDB.setUsers([...userDB.users, newUser]);
    res.status(201).json({ message: 'User created successfully.' });
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'models', 'users.json'),
      JSON.stringify(userDB.users)
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
