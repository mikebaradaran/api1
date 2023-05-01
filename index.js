var customers = require('./customers.json');
var orders = require('./orders.json');
var express = require('express');
const cors = require('cors');
const app = express();
app.use(cors())

var writeJsonResponse = function(res, str) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end( JSON.stringify(str));
}

app.get('/customers', function(req, res){
  writeJsonResponse(res, customers);
});

app.get('/customers/:id', function(req, res){
  let id = req.params.id;
  var data = customers.filter(c => c.CustomerID.toLowerCase() == id.toLowerCase());
  writeJsonResponse(res, data);
});

app.get('/orders', function(req, res){
  writeJsonResponse(res, orders);
});
app.get('/orders/:id', function(req, res){
  let id = req.params.id;
  var data = orders.filter(c => c.CustomerID.toLowerCase() == id.toLowerCase());
  writeJsonResponse(res, data);
});

app.listen(5000, () => console.log('Server running on port 5000!\n'));