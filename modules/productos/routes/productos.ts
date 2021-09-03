import * as express from "express";
import * as productosSchema from "../schemas/productos";

const router = express.Router();

router.get("/productos", async (req, res) => {
    try {
        console.log("Entra a productos nuevos!!!");
        let productos = await productosSchema.productos.find();

        console.log("Producto registrado!!!", productos);
        return res.status(200).send({ status: "success", data: productos });
    } catch (err) {
        console.log("Error: ", err)
        return res.status(404).send({ status: "error", data: err });
    }
});

router.post("/producto",async (req, res)=>{
    try{
        console.log("ingreso correcto")
        const productos = new productosSchema.productos(req.body);
        const productoNuevo = await productos.save();
        return res.status(200).send({ status: "success", data: productoNuevo });
    } catch (err) {
        console.log("Error: ", err)
        return res.status(404).send({ status: "error", data: err });
    }
})

export = router;
