import "dotenv/config";
import { createServer } from "http";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const httpServer = createServer();
const io: Server<DefaultEventsMap, any> = new Server(httpServer, {});

const users: any = {};

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join", (userName) => {
    console.log(`${userName} joined the chat`);
    users[socket.id] = userName;
    socket.join(userName);
    io.emit("user list", Object.values(users));
  });

  socket.on("private message", ({ sender, recipient, message }) => {
    console.log(`Message from ${sender} to ${recipient}: ${message}`);
    io.to(recipient).emit("chat message", `${sender}: ${message}`);
  });

  socket.on("disconnect", () => {
    const userName = users[socket.id];
    console.log(`${userName} disconnected`);
    delete users[socket.id];
    io.emit("user list", Object.values(users));
  });
});

const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
