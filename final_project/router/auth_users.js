const express = require('express');
const jwt = require('jsonwebtoken');
let books = require('./booksdb.js');
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  users.forEach((user) => {
    if (user.username === username) return true;
  });
  return false;
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
  let flag = false;
  users.forEach((user) => {
    console.log(user);
    if (user.username === username && user.password === password) {
      flag = true;
    }
  });
  return flag;
};

//only registered users can login
regd_users.post('/login', (req, res) => {
  //Write your code here
  const { username, password } = req.body;
  if (!authenticatedUser(username, password)) {
    return res.status(403).json({ message: 'User not found' });
  }
  const token = jwt.sign(username, 'SECRET_KEY');
  req.session.authorization = {
    token,
    username,
  };
  return res.status(300).json({ message: 'Logged In', token });
});

// Add a book review
regd_users.put('/auth/review/:isbn', (req, res) => {
  //Write your code here
  const { isbn } = req.params;
  const { review } = req.body;
  const user = req.user;
  books[isbn].reviews[user] = review;
  console.log(books);
  return res.status(300).json({ book: books[isbn] });
});

// Add a book review
regd_users.delete('/auth/review/:isbn', (req, res) => {
  //Write your code here
  const { isbn } = req.params;
  const user = req.user;
  const reviews = books[isbn].reviews;
  delete reviews[user];
  console.log(books);
  return res.status(300).json({ book: books[isbn] });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
