import * as jsonServer from "json-server";
import { Express } from "express";

import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const server = jsonServer.create();
server.use(jsonServer.bodyParser);
server.use(middlewares);

server.post("/users/tree/portfolio", (req, res) => {
  if (req.method === "POST") {
    const tradeResult = req.body;

    const adapter = new FileSync("db.json");
    const db = low(adapter);

    const users = db.get("users").value();
    
    const userIndex = users.findIndex((user: any) => user.id === "tree");

    if (userIndex !== -1) {
      users[userIndex].portfolio.push(tradeResult);
      db.write();
      res.status(200).send("Trade result added to the portfolio.");
    } else {
      res.status(404).send("User not found.");
    }
  }
});

server.use(router);

const port = 5000;
server.listen(port, () => {
  console.log(`JSON Server is running at http://localhost:${port}`);
});
