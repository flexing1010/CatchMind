import express from "express";
import { join } from "path";
import socketIo from "socket.io";
import logger from "morgan";
import events from "./events";
import socketController from "./socketController";

const app = express();
const PORT = 4000;

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(logger("dev"));
app.get("/", (req, res) => res.render("home", { events }));
app.use(express.static(join(__dirname, "static")));

const handleListening = () =>
  console.log(`✅ Server running: http://localhost:${PORT}`);

const server = app.listen(PORT, handleListening);

const io = socketIo(server);

io.on("connection", (socket) => socketController(socket, io));
