const path = require("path");
const fs = require("fs");

const jsonServer = require("json-server");
const server = jsonServer.create();

// In-memory db, initialized from db.json
const dbPath = path.join(__dirname, "db.json");
const dbString = fs.readFileSync(dbPath);
const initialDb = JSON.parse(dbString);
const router = jsonServer.router(initialDb);

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(3001, () => {
  console.log("JSON Server is running");
});
