var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

let tarefas = [];
router.get('/todo', function (req, res) {
  res.render('todo', {
    title: 'To-Do List',
    tarefas
  });
});

router.post('/todo/create', function (req, res) {
  tarefas.push(req.body.tarefa);
  res.send("Tarefa enviada: " + req.body.tarefa);
});

router.post('/todo/delete', function (req, res) {
  var index = Number(req.body.i);
  tarefas.splice(index, 1);

  res.send(tarefas.join(', '));
});

module.exports = router;