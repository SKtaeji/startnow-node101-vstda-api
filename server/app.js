const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const _ = require('lodash');

const app = express();

// add your code here

app.use (morgan ('dev'));
app.use (bodyParser.json());
app.use (bodyParser.urlencoded ({
    extended: true
}));

var data = [
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
];

app.get('/', function (req, res) {
    res.status(200), 
    res.json();
})

app.get('/api/TodoItems', function (req, res, next) {
    res.status(200),
      res.json(data);
    next();
})

app.get('/api/TodoItems/:todoItemId', function (req, res) {
    var finder = req.params.todoItemId;
    var finderNum = Number(finder);
    let newDataItem = _.find(data, {
        todoItemId: finderNum
    });
    res.status(200);
    res.json(newDataItem);
})

app.post('/api/TodoItems/', function (req, res) {
    var newTodo = req.body;
    
    data.push(newTodo);
    res.status(201);
    res.json(newTodo);
})

app.delete('/api/TodoItems/:todoItemId', function (req, res) {
    var finder = req.params.todoItemId;
    var finderNum = Number(finder);
    let killItem = _.findIndex(data, {
        todoItemId: finderNum
    });
    var deleted = data.splice(killItem, 1);
    res.status(200);
    res.json(deleted[0]);

})

app.put('/', function (req, res) {
    res.send('PUT request');
})

app.patch('/', function (req, res) {
    res.send('PATCH request');
})





module.exports = app;
