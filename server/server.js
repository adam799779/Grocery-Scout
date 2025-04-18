const http = require("http");

const { testing } =require("./tests/testing.js");

const server = http.createServer((req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'GET' && req.url === '/test'){
        testing(req,res)
    }
    else{
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify({
            msg: "Route not found."
        }))
    }
});

server.listen(4000, () => {
    console.log("Server started on port 4000");
});
