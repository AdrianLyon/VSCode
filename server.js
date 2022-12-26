const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));
app.use(express.json());

const PORT = 3000;

let products = [{ id: 1, name: "laptop", price: 7500 }];

app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  const newProducts = { ...req.body, id: products.length + 1 };
  products.push(newProducts);
  res.send(newProducts);
});

app.put("/products/:id", (req, res) => {
  const newData = req.body;
  const productFound = products.find((x) => x.id === parseInt(req.params.id));
  if (!productFound)
    return res.status(404).json({
      message: "Product not found",
    });

  products = products.map((x) =>
    x.id === parseInt(req.params.id) ? { ...x, ...newData } : x
  );
  res.json({ message: "Product updated" });
});

app.delete("/products/:id", (req, res) => {
  const productFound = products.find((x) => x.id === parseInt(req.params.id));
  if (!productFound)
    return res.status(404).json({
      message: "Product not found",
    });

  products = products.filter((x) => x.id !== parseInt(req.params.id));
  res.sendStatus(204);
});

app.get("/products/:id", (req, res) => {
  const productFound = products.find((x) => x.id === parseInt(req.params.id));
  if (!productFound)
    return res.status(404).json({
      message: "Product not found",
    });
  res.json(productFound);
});

app.listen(PORT);
console.log("Express server listening on port", PORT);
