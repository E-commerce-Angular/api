import * as express from "express";
import * as usuariosSchema from "../schemas/usuarios";

const router = express.Router();

router.get("/usuarios", async (request, response) => {
    try {
        console.log("Entra a usuarios!!!");
        let usuarios = await usuariosSchema.usuarios.find();

        console.log("usuarios!!!", usuarios);
        return response.status(200).send({ status: "success", data: usuarios });
    } catch (err) {
        console.log("Error: ", err)
        return response.status(404).send({ status: "error", data: err });
    }
});

export = router;