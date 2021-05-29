const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 5000;
var userList = [];

io.on("connection", socket => {


    // join room
    const { roomId, username } = socket.handshake.query;

    const user = {
        roomId: roomId,
        username: username
    };

    socket.join(roomId);
    userList.push(user);

    var usersInRoom = [];
    for (i = 0; i < userList.length; i++) {

        // filter dangling sockets.
        if(userList[i].username !== undefined && userList[i].username !== '' && userList[i].username !== "undefined"){
                usersInRoom.push(userList[i]);

        }
    }
    
    io.in(roomId).emit("userList", usersInRoom);


    // Listen for message

    socket.on("chat", (data) => {
        io.in(roomId).emit("chat", data);
    });

    // Disconnect

    socket.on("disconnect", () => {
        socket.leave(roomId);
    });

});

server.listen(port, () => console.log("server running on port:" + port));