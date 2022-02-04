const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const p = path.join(__dirname, '..', 'models', 'todos.json');

const getAllTodos = async (req, res) => {
  const rawTodos = await fsPromises.readFile(p, 'utf8');
  const todos = JSON.parse(rawTodos);
  res.json(todos);
};

const createNewTodo = () => {
  res.json({
    title: req.body.title,
    desciption: req.body.desciption,
  });
};

const updateTodo = () => {
  res.json({
    title: req.body.title,
    desciption: req.body.desciption,
  });
};

const deleteTodo = () => {
  res.json({
    id: req.body.id,
  });
};

module.exports = {
  getAllTodos,
  createNewTodo,
  updateTodo,
  deleteTodo,
};
