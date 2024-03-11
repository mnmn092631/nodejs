const http = require("http");
const fs = require("fs");
const url = require("url");

function templateHTML(title, list, body) {
  return `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          ${list}
          <a href="/create">create</a>
          ${body}
        </body>
        </html>
        `;
}

function templateList(files) {
  let list = "<ul>";
  let i = 0;
  while (i < files.length) {
    list += `<li><a href="/?id=${files[i]}">${files[i]}</a></li>`;
    i++;
  }
  list += "</ul>";

  return list;
}

const app = http.createServer((request, response) => {
  let _url = request.url;
  const queryData = url.parse(_url, true).query;
  const pathname = url.parse(_url, true).pathname;

  if (pathname === "/") {
    if (queryData.id === undefined) {
      fs.readdir("./data", (err, files) => {
        const title = "Welcome";
        const description = "Hello, Node.js";
        const list = templateList(files);
        const template = templateHTML(
          title,
          list,
          `<h2>${title}</h2><p>${description}</p>`,
        );
        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readdir("./data", (err, files) => {
        fs.readFile(`data/${queryData.id}`, "utf8", (err, description) => {
          const title = queryData.id;
          const list = templateList(files);
          const template = templateHTML(
            title,
            list,
            `<h2>${title}</h2><p>${description}</p>`,
          );
          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else if (pathname === "/create") {
    fs.readdir("./data", (err, files) => {
      const title = "WEB - create";
      const description = "Hello, Node.js";
      const list = templateList(files);
      const template = templateHTML(
        title,
        list,
        `
        <form action="http://localhost:3000/process_create" method="post">
        <p><input type="text" name="title" placeholder="title" /></p>
        <p><textarea name="description" placeholder="description" ></textarea></p>
        <p><input type="submit" /></p>
        </form>
        `,
      );
      response.writeHead(200);
      response.end(template);
    });
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});

app.listen(3000);
