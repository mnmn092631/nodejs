module.exports = {
  html: function (title, list, body, control) {
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
          ${control}
          ${body}
        </body>
        </html>
        `;
  },
  list: function (files) {
    let list = "<ul>";
    let i = 0;
    while (i < files.length) {
      list += `<li><a href="/?id=${files[i]}">${files[i]}</a></li>`;
      i++;
    }
    list += "</ul>";
    return list;
  },
};
