const express = require("express");
const router = express.Router();
const database = require("./database");

// lägg en produkt  till varukorg
router.post("/api/bag", (req, res) => {
  const productname = req.body.productname;
  const username = req.body.username;

  const product = database
    .get("products")
    .find({ productname })
    .value();
  const productIn = database
    .get("bag")
    .find({ productname, username })
    .value();

  if (product && !productIn) {
    database
      .get("bag")
      .push({
        productname: productname,
        productprice: product.productprice,
        productpicture: product.productpicture,
        username: username
      })
      .write();
    res.send(JSON.stringify({ status: "success" }));
  } else {
    res.send(JSON.stringify({ status: "failed" }));
  }
});

// hämtar alla producter som lägger i varukorg
router.get("/api/bag", (req, res) => {
  let result = database
    .get("bag")
    // i början använde jag ".find" då fick jag bara en i value.
    // ".map" betyder get alla men jag vill bara ha mitt username.
    .filter({
      username: req.query.username
    })
    .value();
  res.send(result);
});

// ta bort en produkt
router.delete("/api/bag", (req, res) => {
  const productname = req.query.productname;
  const username = req.query.username;
  // kolla, om det finns produkter
  const productIn = database
    .get("bag")
    .find({ productname, username })
    .value();

  if (productIn) {
    database
      .get("bag")
      .remove({ productname, username })
      .write();
    res.send(JSON.stringify({ status: "success" }));
  } else {
    res.send(JSON.stringify({ status: "failed" }));
  }
});

module.exports = router;
