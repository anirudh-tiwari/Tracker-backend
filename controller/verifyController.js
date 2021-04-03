const mysql = require("mysql");
const conn = mysql.createConnection({
    host: "localhost",
    user: "anirudh",
    password: "suman1979",
    database: "tracker",
});
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;
const SMS_SECRET_KEY = process.env.SMS_SECRET_KEY;


const verifyController = (req, res) => {
    const mobile_number = req.body.mobile_number;
    const hash = req.body.hash;
    const otp = req.body.otp;
    let [hashValue, expires] = hash.split(".");
    let now = Date.now();
    if (now > parseInt(expires)) {
        return res.status(504).send({ msg: "Timeout Pls Try Again" })
    }
    let data = `${mobile_number}.${otp}.${expires}`;
    let newCalculatedHash = crypto.createHmac("sha256", SMS_SECRET_KEY).update(data).digest("hex");
    if (newCalculatedHash === hashValue) {
        let number = `SELECT * from User where MobileNumber=${mobile_number}`;
        if (!number) {
            let data = { MobileNumber: req.body.MobileNumber, Role: req.body.role };
            let sql = "INSERT INTO User SET ?";
            let query = conn.query(sql, data, (err, result) => {
                if (err) throw err;
                return res.json({ status: 200, error: null, response: "New Record is Added successfully" });
            });
        }
        const accessToken = jwt.sign(mobile_number, JWT_AUTH_TOKEN);
        const refreshToken = jwt.sign(mobile_number, JWT_REFRESH_TOKEN);
        res.status(202).cookie("accessToken", accessToken, { httpOnly: true }).cookie("refreshToken", refreshToken, { httpOnly: true }).send({ msg: "User Confirmed" })
    } else {
        return res.status(400).send({ verification: false, msg: "Incorrect OTP" })
    }
}

module.exports = { verifyController }