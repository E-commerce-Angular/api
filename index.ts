import * as express from "express";
import { initAPI } from "./iniciar";

const app = express();
initAPI(app);

const port = 3002;
const server = app.listen(port, () => console.log("Escuchando en el puerto 3002"));
