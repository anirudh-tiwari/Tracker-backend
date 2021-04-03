const mysql = require("mysql");
const conn = mysql.createConnection({
    host: "localhost",
    user: "anirudh",
    password: "suman1979",
    database: "tracker",
});


const createSteps = (req, res) => {
    try {
        let data = { steps: req.body.steps, step_number: req.body.step_number, product_id: req.body.product_id };
        let sql = "INSERT INTO Steps SET ?";
        let query = conn.query(sql, data, (err, result) => {
            console.log(result)
            if (err) throw err;
            return res.json({ status: 200, error: null, response: "New Record is Added successfully" });
        });
    } catch (err) {
        console.log(err)
        return res.json({ status: 500, error: err });
    }
}

module.exports = { createSteps }