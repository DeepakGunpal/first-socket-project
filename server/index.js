const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log("user connected ==>", socket.id);
    socket.on("sendMessage", (message) => {
        console.log("message =>", message)
        socket.broadcast.emit("receiveMessage", message);
    })
})

server.listen(3001, () => console.log("listening on 3001"));