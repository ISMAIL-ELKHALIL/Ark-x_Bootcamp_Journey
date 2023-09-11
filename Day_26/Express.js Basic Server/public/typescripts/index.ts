import express, { Express, Response, Request } from "express";
const app: Express = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
  res.download('')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
