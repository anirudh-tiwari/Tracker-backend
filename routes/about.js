var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
    res.cookie("test1", "testing cookie setup1")
    res.json('Welcome to You in About Page');
});
module.exports = router;