const express = require('express');
const router = express.Router();
const { createSteps } = require("../controller/stepController")

router.post("/create", createSteps);

module.exports = router;


