var app = require('http').createServer(createServer);
var fs = require('fs'); 
var url = require('url');

function createServer(req, res) 
{
    var path = url.parse(req.url).pathname;
    var fsCallback = function(error, data) 
    {
        if(error) 
        {
            //ignore favicon errors
            if(error.path == null || 
                (error.path.indexOf(".ico") == -1))
            {
                console.log(error);
            }
        }

        res.writeHead(""+200);
        res.write(""+data);
        res.end();
    }

    if(path != "/") 
    	doc = fs.readFile(__dirname + '/build' + path, fsCallback);
    else
    	doc = fs.readFile(__dirname + '/build/index.html', fsCallback);
}

app.listen(8888);
console.log("Server listening to localhost:8888");