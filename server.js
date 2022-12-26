const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));

const PORT = 3000;

app.get("/products", (req, res) => {
  res.send("get products");
});

app.post("/products", (req, res) => {
  res.send("create a product");
});

app.put("/products", (req, res) => {
  res.send("update a product");
});

app.delete("/products", (req, res) => {
  res.send("delete a product");
});

app.get("/products/:id", (req, res) => {
  res.send("get a product");
});

app.listen(PORT);
console.log("Express server listening on port", PORT);
