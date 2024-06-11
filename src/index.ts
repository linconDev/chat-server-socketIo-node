import { createServer } from "http";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const httpServer = createServer();
const io: Server<DefaultEventsMap, any> = new Server(httpServer, {});

io.on("connection", (socket) => {

});

io.listen(3000);
