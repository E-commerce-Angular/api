import * as express from "express";
import { initAPI } from "./iniciar";

const app = express();

initAPI(app);

const port = 3002;
const server = app.listen(port, () => console.log("Escuchando en el puerto 3002!!!!!!!"));

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
    },
});
app.set("socketio", io);
io.on("connection", function (socket) {
    console.log("Conectado el socket");

    socket.emit("crearProducto", "Jeloouuuuu");

    socket.on("borrarProducto", function (producto) {
        console.log("Producto borrado: ", producto);
    });
});

// Configuring Passport
var passport = require("passport"); //importando paquete de passport
// var expressSession = require('express-session');
// app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
