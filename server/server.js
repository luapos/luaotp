const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {cors: {origin: "*"}});

app.use(express.json());

let otpStore = {};

app.post("/send-otp", (req, res) => {
    const {phone} = req.body;
    if (!phone) return res.status(400).json({error: "Invalid phone number"});

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[phone] = otp;

    io.emit("send_sms", {phone, message: `Your OTP is: ${otp}`});

    res.json({success: true, message: "OTP sent successfully"});
});

app.post("/verify-otp", (req, res) => {
    const {phone, otp} = req.body;
    if (!phone || !otp) return res.status(400).json({error: "Invalid data"});

    if (otpStore[phone] === otp) {
        delete otpStore[phone];
        res.json({success: true, message: "OTP verified successfully"});
    } else {
        res.status(400).json({error: "Invalid OTP"});
    }
});

server.listen(5000, () => console.log("Server running on port 5000"));
