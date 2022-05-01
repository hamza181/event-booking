const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res, next) => {
    res.send("Hello World!");
});

app.listen(5000, () => {
  console.log("Server started on port 3000");
});
