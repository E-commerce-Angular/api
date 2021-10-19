import * as express from "express";
import { initAPI } from "./iniciar";

const app = express();

initAPI(app);

const port = 3002;
const server = app.listen(port, () => console.log("Escuchando en el puerto 3002!!!!!!!"));

//Importamos socket.io
const io = require("socket.io")(server, {
    cors: { //Le decimos que el origen acepte los metodos de GET y POST
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
    },
});
app.set("socketio", io); //Pasamos la instancia de socket a express para que express esté escuchando todas las rutas con la conexion a socket 
io.on("connection", function (socket) { //Hacemos la coneccion. "socket" es una variable que nos devuelve socket para poder trabajar 
    
    console.log("Conectado el socket");
    socket.emit("crearProducto", "Jeloouuuuu"); //Emite Jeloouuuu para la llamada de crearProducto

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
