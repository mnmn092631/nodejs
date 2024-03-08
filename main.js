const http = require("http");
const fs = require("fs");
const url = require("url");

const app = http.createServer(function (request, response) {
  let _url = request.url;
  const queryData = url.parse(_url, true).query;

  if (_url === "/") _url = "/index.html";
  if (_url === "/favicon.ico") {
    response.writeHead(404);
    response.end();
    return;
  }

  response.writeHead(200);
  response.end(fs.readFileSync(__dirname + _url));
});

app.listen(3000);
