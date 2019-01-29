var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser=require('body-parser');

// Set up connection to database.
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'zessta',
  database: 'my-db',
});
app.use(bodyParser.json());
//app.use(app.router);


// Connect to database.
// connection.connect();
connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});
app.post('/users', function(req, res) {

  // Get sent data.

  var user = req.body;
  // Do a MySQL query.
  console.log(user);
  var query = connection.query('INSERT INTO fb1 SET ?',user, function(err, result) {
    console.log(result);
    console.log(err);

  })
  res.json({message:'Success'});
});
app.get('/users', function (req, res) {
  connection.query('SELECT * FROM fb1', function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});
app.get('/users/:name', function (req, res) {
  connection.query('SELECT * FROM fb1 WHERE name=?', [req.params.name], function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});
app.listen(3001, function() {
  console.log('Example app listening on port 3001!');
});