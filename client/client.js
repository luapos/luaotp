const io = require("socket.io-client");

const SERVER_URL = "http://127.0.0.1:5000";

const socket = io(SERVER_URL);

socket.on("connect", () => {
    console.log("✅ Connected to server:", SERVER_URL);

    socket.emit("message", {client: "Hello Server!"});
});

socket.on("send_sms", (data) => {
    console.log("📩 Received message from server:", data);
});

socket.on("disconnect", () => {
    console.log("❌ Disconnected from server");
});
