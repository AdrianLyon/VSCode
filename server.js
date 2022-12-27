const express = require("express");
const morgan = require("morgan");
const path = require("path");
require("ejs");

const app = express();
const productRoute = require("./routes/product");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(morgan("dev"));
app.use(express.json());

const PORT = 3000;

app.use(productRoute);
app.listen(PORT);
console.log("Express server listening on port", PORT);