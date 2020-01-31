const express = require("express");
const router = express.Router();
const database = require("./database");

// skapar en product
router.post("/api/products", (req, res) => {
  const productname = req.body.productname;
  const productprice = req.body.productprice;
  const productpicture = req.body.productpicture;
  database
    .get("products")
    .push({
      productname: productname,
      productprice: productprice,
      productpicture: productpicture
    })
    .write();
  res.send(JSON.stringify({ status: "success " }));
});

// hämtar alla produkter
router.get("/api/products", (req, res) => {
  res.send(JSON.stringify({ data: database.get("products").value() }));
});

module.exports = router;
