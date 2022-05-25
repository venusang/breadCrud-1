const React = require("react");

function Default(html) {
  return (
    <html>
      <head>
        <title>Bread Gang</title>
      </head>
      <body>
        <h1>Default Template</h1>
        <div className="container">{html.children}</div>
      </body>
    </html>
  );
}

module.exports = Default;
