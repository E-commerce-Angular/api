import * as express from "express";
import * as autenticacionesSchema from "../schemas/autenticaciones";

import { findUser } from "../autenticaciones.controller";
import { Auth } from "../autenticaciones.class";

const bcrypt = require("bcrypt");
const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

const router = express.Router();

router.post("/usuario", async (req, res) => {
    try {
        const newUser = req.body;
        const usuarios = new autenticacionesSchema.usuarios(newUser);
        const usuarioNuevo = await usuarios.save();
        console.log("User agregado", usuarioNuevo);
        return res.status(200).send({ status: "success", data: usuarioNuevo });
    } catch (err) {
        console.log("Error: ", err);
        return res.status(404).send({ status: "error", data: err });
    }
});

router.post("/registro", async (req, res) => {
    console.log("Usuario registro: ", req.body);

    try {
        const email = req.body.usuario;
        const password = req.body.password;

        await checkEmail(email);
        await checkPassword(password);
        await testEmail(email);

        if (await findUser(email)) {
            return { status: "error", msg: "El usuario ya existe!" };
        }

        const usuarioRegistrado = new autenticacionesSchema.usuarios(req.body);
        await usuarioRegistrado.save();

        return res.status(200).send({ status: "success", data: usuarioRegistrado });
    } catch (err) {
        console.log("Error: ", err);
        return res.status(404).send({ status: "error", data: err });
    }
});

router.post("/login", async (req, res, next) => {
    // Función interna que genera token

    const login = async (user) => {
        console.log("Entra al login: ", user);
        res.json({
            //Genera el token y devuelve un usuario hacia la app
            token: Auth.generateUserToken2(user.usuario),
        });
    };

    console.log("Usuario posta validando: ", req.body);
    if (!req.body.usuario || !req.body.password) {
        //Verifica que el usuario haya ingresado algo, sino lo rebota
        return next(403);
    }

    try {
        console.log("Usuario posta: ", req.body.usuario);
        const userResponse = await findUser(req.body.usuario); //El usuario que viene de la app lo busca en la bdd para ver si está registrado

        if (userResponse) {
            //Si el objeto es diferente a null
            const { user }: any = userResponse;
            console.log("Usuario encontrado: ", user);
            const passwordSha1 = await bcrypt.compare(req.body.password, user.password);

            if (passwordSha1) {
                return login(user);
            }
        }
        return next(403);
    } catch (error) {
        console.log("Error: ", error);
        return next(403);
    }
});

function checkEmail(email) {
    if (!email) {
        throw { status: "error", msg: "Falta ingresar el email!" };
    }
    return;
}

function checkPassword(password) {
    if (!password) {
        throw { status: "error", msg: "Falta ingresar el password!" };
    }
    return;
}

function testEmail(email) {
    console.log("Email> ", email);
    if (!emailRegex.test(email)) {
        throw { status: "error", msg: "El email es invalido!" };
    }
}

export = router;
