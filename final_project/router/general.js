const express = require('express');
let books = require('./booksdb.js');
let isValid = require('./auth_users.js').isValid;
let users = require('./auth_users.js').users;
const public_users = express.Router();

public_users.post('/register', (req, res) => {
  //Write your code here
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Please enter both username and password' });
  }
  if (users.includes(username)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users.push({ username, password });

  return res.status(200).json({ message: 'Successfully registered' });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  const booksArr = [];
  let myPromise = new Promise((resolve, reject) => {
    let allBooks = Array.from(Object.values(books));
    for (let i = 0; i < allBooks.length; i++) {
      const element = allBooks[i];
      booksArr.push(element);
    }
    resolve('Promise resolved');
  });
  myPromise.then((message) => {
    return res.status(200).json({ success: true, message, books: booksArr });
  });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const { isbn } = req.params;
  let myPromise = new Promise((resolve, reject) => {
    resolve('Promise resolved');
  });
  //Write your code here
  myPromise.then((message) => {
    return res.status(200).json({ success: true, books: books[isbn] });
  });
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  //Write your code here
  const { author } = req.params;
  const response = [];
  let myPromise = new Promise((resolve, reject) => {
    let allBooks = Array.from(Object.values(books));
    allBooks.forEach((book) => {
      if (book.author === author) {
        response.push(book);
      }
    });
    resolve('Promise resolved');
  });
  myPromise.then((message) => {
    return res.status(200).json({ success: true, books: response });
  });
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  //Write your code here
  const { title } = req.params;
  const response = [];
  let myPromise = new Promise((resolve, reject) => {
    let allBooks = Array.from(Object.values(books));
    allBooks.forEach((book) => {
      if (book.title === title) {
        response.push(book);
      }
    });
    resolve('Promise resolved');
  });
  myPromise.then((message) => {
    return res.status(200).json({ success: true, books: response });
  });
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const { isbn } = req.params;
  //Write your code here
  return res.status(200).json({ success: true, books: books[isbn] });
});

module.exports.general = public_users;
