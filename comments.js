// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const comments = require('./comments');
const port = 3000;

// Add middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Add route
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Add route
app.get('/comments/:id', (req, res) => {
  const comment = comments.find(c => c.id === parseInt(req.params.id));
  if (!comment) res.status(404).send('The comment with the given ID was not found.');
  res.send(comment);
});

// Add route
app.post('/comments', (req, res) => {
  const comment = {
    id: comments.length + 1,
    name: req.body.name,
    comment: req.body.comment
  };
  comments.push(comment);
  res.send(comment);
});

// Add route
app.put('/comments/:id', (req, res) => {
  const comment = comments.find(c => c.id === parseInt(req.params.id));
  if (!comment) res.status(404).send('The comment with the given ID was not found.');

  comment.name = req.body.name;
  comment.comment = req.body.comment;

  res.send(comment);
});

// Add route
app.delete('/comments/:id', (req, res) => {
  const comment = comments.find(c => c.id === parseInt(req.params.id));
  if (!comment) res.status(404).send('The comment with the given ID was not found.');

  const index = comments.indexOf(comment);
  comments.splice(index, 1);

  res.send(comment);
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});