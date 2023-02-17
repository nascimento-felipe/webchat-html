import express from "express";
import * as http from "http"
import { Server } from "socket.io"
import path from "path"

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")))

const serverHttp = http.createServer(app);

const io = new Server(serverHttp)

export { serverHttp, io }