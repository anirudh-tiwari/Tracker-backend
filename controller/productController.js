const mysql = require("mysql");
const conn = mysql.createConnection({
    host: "localhost",
    user: "anirudh",
    password: "suman1979",
    database: "tracker",
});

const registerProduct = async (req, res) => {
    try {
        let data = { name: req.body.name, image: req.body.image, shop_id: req.body.shop_id };
        let sql = "INSERT INTO Product SET ?";
        let query = conn.query(sql, data, (err, result) => {
            console.log(result)
            if (err) throw err;
            return res.json({ id: result.insertId, status: 200, error: null, response: "New Record is Added successfully" });
        });
    } catch (err) {
        console.log(err)
        return res.json({ status: 500, error: err });
    }
}

module.exports = { registerProduct }