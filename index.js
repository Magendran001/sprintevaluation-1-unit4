const express = require("express");

const app = express();

app.get("/books", logger, (req, res) => {
  try {
    console.log(req.path);
    return res.send({ route: "/books" });
  } catch (e) {
    return res.send(e.message);
  }
});
app.get("/libraries", logger, checkPermission("librarian"), (req, res) => {
  try {
    return res.send(req.datas);
  } catch (e) {
    return res.send(e.message);
  }
});
app.get("/authors", logger, checkPermission("authors"), (req, res) => {
  try {
    return res.send(req.datas);
  } catch (e) {
    return res.send(e.message);
  }
});

function logger(req, res, next) {
  console.log(req.path);
  next();
}

function checkPermission(data) {
  return function (req, res, next) {
    let path = req.path.split("/")[1];

    if (data == path) {
      req.datas = { route: req.path, Permission: true };
      next();
    }
    next();
  };
}

app.listen(8629, async (req, res) => {
  console.log("listening on 8629 port");
});
