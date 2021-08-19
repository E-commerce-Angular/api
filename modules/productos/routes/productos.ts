import * as express from "express";
import * as productosSchema from "../schemas/productos";

const router = express.Router();

router.get("/pepe", async (request, response) => {
    try {
        console.log("Entra a productos nuevos!!!");
        let productos = await productosSchema.productos.find();

        console.log("Productos!!!", productos);
        return response.status(200).send({ status: "success", data: productos });
    } catch (err) {
        console.log("Error: ", err)
        return response.status(404).send({ status: "error", data: err });
    }
});

export = router;
