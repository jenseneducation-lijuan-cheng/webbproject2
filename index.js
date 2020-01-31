const express = require("express");
const app = express();
const bag = require("./bag");
const products = require("./products");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));
// use the routes från bag
app.use("/", bag);
app.use("/", products);

app.listen(port);
