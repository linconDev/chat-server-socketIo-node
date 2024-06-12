import "dotenv/config";
import { createServer } from "http";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const httpServer = createServer();
const io: Server<DefaultEventsMap, any> = new Server(httpServer, {});

io.on("connection", (socket) => {
  console.log("a user connected", socket);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    console.log('Message Received: ' + msg)
    io.emit("chat message", msg);
  });
});

const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
