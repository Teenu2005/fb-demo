const http = require("http");
const next = require("next");
const fs = require("fs");

const log = (msg) => {
  try {
    fs.appendFileSync(
      __dirname + "/logs/app.log",
      `[${new Date().toISOString()}] ${msg}\n`
    );
  } catch (e) {}
};

process.on("uncaughtException", (err) => {
  log("UNCAUGHT EXCEPTION: " + err.stack);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  log("UNHANDLED PROMISE: " + reason);
});

log("Starting Next.js server...");

const app = next({
  dev: false,
  dir: __dirname,
});

const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    http.createServer((req, res) => {
      handle(req, res);
    }).listen(process.env.PORT, () => {
      log("Server listening on port " + process.env.PORT);
    });
  })
  .catch((err) => {
    log("NEXT PREPARE FAILED: " + err.stack);
    process.exit(1);
  });
