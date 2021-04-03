const express = require('express');
const router = express.Router();
const { registerProduct } = require("../controller/productController")

router.post("/create", registerProduct);

module.exports = router;


