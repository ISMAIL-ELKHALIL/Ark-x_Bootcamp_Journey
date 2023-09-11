"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const http_1 = __importDefault(require("http"));
const url_1 = __importDefault(require("url"));
function renderHTML(path, res) {
    fs_1.default.readFile(path, (error, data) => {
        if (error) {
            res.writeHead(404);
            res.write("file not found");
            res.end();
        }
        else {
            res.writeHead(200, { "content-type": "text/html" });
            res.write(data);
            res.end();
        }
    });
}
function requestHandler(req, res) {
    let urlPathname = url_1.default.parse(req.url).pathname;
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
http_1.default.createServer(requestHandler).listen(1400);
//# sourceMappingURL=challenge.js.map