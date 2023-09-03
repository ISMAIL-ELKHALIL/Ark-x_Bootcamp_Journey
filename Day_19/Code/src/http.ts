//? The HTTP interfaces in Node.js are designed to support many features of the protocol which have been traditionally difficult to use. In particular, large, possibly chunk-encoded, messages. The interface is careful to never buffer entire requests or responses, so the user is able to stream data.
import http from "http";

const server = http.createServer(function (req, res) {
  if (req.url === "/") {
    res.write("Hello world");
    res.end();
  }

  if (req.url === "/api/numbers") {
    res.write("[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]");
    res.end();
  }

  if (req.url === "/api/names") {
    res.write(JSON.stringify(["Ahmed", "Ali", "Nama", "Roma"]));
    res.end();
  }
});

server.listen(3000);
console.log("listening on Port: 3000");
