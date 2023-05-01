var customers = require('./customers.json')
var orders = require('./orders.json')

var writeResponse = function(res, str) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(str);
}
var writeJsonResponse = function(res, str) {
    writeResponse(res, JSON.stringify(str));
}

var writeHelp = function(res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end("customers\n/orders");
}

var notFound = function(res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end("The data you have requested could not be found");
}

const server = require('http').createServer();

server.on('request', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    var urlParts = req.url.toLowerCase().split('/');
    var command = urlParts[1];
    var id = urlParts[2];

    if (command == 'customers') {
        if(id==null)
          writeJsonResponse(res, customers);
        else
        {
          var cus = customers.filter(c => c.CustomerID.toLowerCase() == id);
          if (cus.length == 0)
            notFound(res);
          else
            writeJsonResponse(res, cus[0]);
        }
      }        
    else if (command == 'orders') {
        if(id==null)
          writeJsonResponse(res, orders);
        else {
          console.log('getting orders with id=' + id);
          var data = orders.filter(o => o.CustomerID.toLowerCase() == id);
          writeJsonResponse(res, data);
        }
      }
    else {
        writeHelp(res);
    }
});

server.listen(5000, () => console.log('Server is serving now on port 5000!\n'));