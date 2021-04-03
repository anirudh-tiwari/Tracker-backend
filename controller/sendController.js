const mysql = require("mysql");
const conn = mysql.createConnection({
    host: "localhost",
    user: "anirudh",
    password: "suman1979",
    database: "tracker",
});
const crypto = require('crypto');
var otpGenerator = require('otp-generator')
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const SMS_SECRET_KEY = process.env.SMS_SECRET_KEY;


const sendController = (req, res) => {
    try {

        const mobile_number = req.body.mobile_number;
        const otp = otpGenerator.generate(4, { alphabets: false, upperCase: false, specialChars: false });
        const ttl = 5 * 60 * 1000;
        const expires = Date.now() + ttl;
        const data = `${mobile_number}.${otp}.${expires}`;
        const hash = crypto.createHmac("sha256", SMS_SECRET_KEY).update(data).digest("hex");
        const fullHash = `${hash}.${expires}`;

        client.messages
            .create({
                body: `Your OTP number is ${otp}`,
                from: '+12016279150',
                // to: '+91 99102 31951'
                to: mobile_number
            })
            .then(message => console.log(message))

            .catch((err) => console.log(err))
        res.cookie("otp_status", "checking OTP")
        res.status(200).send({ mobile_number, hash: fullHash, otp })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { sendController }