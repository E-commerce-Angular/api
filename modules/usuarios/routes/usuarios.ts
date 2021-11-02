import * as express from "express";
import * as usuariosSchema from "../schemas/usuarios";

import { findUser } from "../usuarios.controller";
import { User } from "../usuarios.class";

const sha1Hash = require("sha1");
const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

const router = express.Router();

router.get("/usuarios", async (req, res) => {
  try {
    let usuarios = await usuariosSchema.usuarios.find();
    console.log("Usuarios registrados!!!", usuarios);
    return res.status(200).send({ status: "success", data: usuarios });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(404).send({ status: "error", data: err });
  }
});

router.post("/usuario", async (req, res) => {
  try {
    const newUser = req.body;
    const usuarios = new usuariosSchema.usuarios(newUser);
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

      const usuarioRegistrado = new usuariosSchema.usuarios(req.body);
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
          token: User.generateUserToken2(user.usuario),
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
          const passwordSha1 = req.body.password;
          // const passwordSha1 = sha1Hash(req.body.password); //Encripta el password que viene de la app
          if (passwordSha1 === user.password) {
              //Si la clave que viene de la bdd y de la aplicacion son iguales entra
              return login(user);
          }
      }
      return next(403);
  } catch (error) {
      console.log("Error: ", error);
      return next(403);
  }
});

router.put("/usuario/:id", async (req, res) => {
  try {
    console.log("Id Usuario", req.params);
    const userUpdate = req.body;
    const idUser = req.params.id;
    const userUpdated = await usuariosSchema.usuarios.findByIdAndUpdate(
      idUser,
      userUpdate,
      { new: true }
    );
    console.log("User modificado", userUpdated);
    return res.status(200).send({ status: "success", data: userUpdated });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(404).send({ status: "error", data: err });
  }
});

router.delete("/usuario/:id", async (req, res) => {
  try {
    const userDelete = req.body;
    const idUser = req.params.id;
    const userDeleted = await usuariosSchema.usuarios.findByIdAndDelete(
      idUser,
      userDelete
    );
    console.log("User Borrado", userDeleted);
    return res.status(200).send({ status: "success", data: userDeleted });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(404).send({ status: "error", data: err });
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
