const { Router } = require("express");

const router = Router();
let products = [{ id: 1, name: "laptop", price: 7500 }];

router.get("/", (req, res) => {
  //res.json(products);
  const title = "Page main";
  res.render("index", { title });
});

router.get("/products", (req, res) => {
  //const pro = res.json(products);
  const title = "list products";
  res.render("products", { title, products });
});

router.post("/products", (req, res) => {
  const newProducts = { ...req.body, id: products.length + 1 };
  products.push(newProducts);
  res.send(newProducts);
});

router.put("/products/:id", (req, res) => {
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

router.delete("/products/:id", (req, res) => {
  const productFound = products.find((x) => x.id === parseInt(req.params.id));
  if (!productFound)
    return res.status(404).json({
      message: "Product not found",
    });

  products = products.filter((x) => x.id !== parseInt(req.params.id));
  res.sendStatus(204);
});

router.get("/products/:id", (req, res) => {
  const productFound = products.find((x) => x.id === parseInt(req.params.id));
  if (!productFound)
    return res.status(404).json({
      message: "Product not found",
    });
  res.json(productFound);
});

module.exports = router;
