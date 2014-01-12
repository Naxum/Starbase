var connect = require('connect');

connect.createServer(
    connect.static(__dirname)
).listen(8888);
console.log("Server up and listening on 8888");