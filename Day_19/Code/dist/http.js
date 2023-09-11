"use strict";
//? The HTTP interfaces in Node.js are designed to support many features of the protocol which have been traditionally difficult to use. In particular, large, possibly chunk-encoded, messages. The interface is careful to never buffer entire requests or responses, so the user is able to stream data.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import http from "http";
const http_1 = __importDefault(require("http"));
const url_1 = __importDefault(require("url"));
//import fs from "fs";
const port = 3000;
// import url from 'url';
//* Create the Server: Next, we need to create an instance of the HTTP server. This server will handle incoming requests and send responses. Use the following code:
/* function renderHTML(path: string, response: http.ServerResponse) {
  fs.readFile(path, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.write("File not find");
    } else {
      response.write(data);
    }
    response.end();
  });
} */
let array = {
    id: 0,
    name: "ismail",
};
http_1.default
    .createServer((req, res) => {
    let urlPathname = url_1.default.parse(req.url).pathname;
    res.writeHead(200, { "content-type": "text/plain" });
    console.log(urlPathname);
    switch (urlPathname) {
        case "/page_html":
            console.log(array);
            res.write(JSON.stringify(array)); // Convert the object to JSON string
            res.end();
            break;
        default:
            res.writeHead(404);
            res.write("Page not found");
            res.end();
    }
})
    .listen(port, () => {
    console.log(`listening at Port`, port);
});
//# sourceMappingURL=http.js.map