const mysql = require("mysql");
const conn = mysql.createConnection({
    host: "localhost",
    user: "anirudh",
    password: "suman1979",
    database: "tracker",
});

const registerShop = (req, res) => {
    try {
        let data = { name: req.body.name, email: req.body.email, mobile_number: req.body.mobile_number, description: req.body.description, shop_owner_name: req.body.shop_owner_name };
        let sql = "INSERT INTO Shop SET ?";
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

module.exports = { registerShop }