const express = require('express');
const router = express.Router();
const { registerShop } = require("../controller/shopController")

router.post("/create", registerShop);

module.exports = router;


