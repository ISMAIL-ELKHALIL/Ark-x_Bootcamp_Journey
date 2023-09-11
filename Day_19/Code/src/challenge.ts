import fs from "fs";
import http from "http";

import url from "url";

function renderHTML(path: string, res: http.ServerResponse) {
  fs.readFile(path, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.write("file not found");
      res.end();
    } else {
      res.writeHead(200, { "content-type": "text/html" });
      res.write(data);
      res.end();
    }
  });
}

function requestHandler(req: http.IncomingMessage, res: http.ServerResponse) {
  let urlPathname = url.parse(req.url!).pathname;

  switch (urlPathname) {
    case "/":
      renderHTML("./page.html", res);
      break;
    default:
      res.writeHead(404);
      res.write("Path does not exist");
      res.end();
      break;
  }
}

http.createServer(requestHandler).listen(1400);
