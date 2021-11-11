import * as express from "express";
import * as comidasSchema from "../schemas/comidas";

import { findComida } from "../comidas.controller";
import { User } from "../comidas.class";

const sha1Hash = require("sha1");
const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

const router = express.Router();


router.post("/comida", async (req, res) => {
  try {
    const newComida = req.body;
    const comidas = new comidasSchema.comidas(newComida);
    const comidaNuevo = await comidas.save();
    console.log("User agregado", comidaNuevo);
    return res.status(200).send({ status: "success", data: comidaNuevo });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(404).send({ status: "error", data: err });
  }
});


router.get("/comidas", async (req, res) => {
  try {
    let comidas = await comidasSchema.comidas.find();
    console.log("comidas registradas!!!", comidas);
    return res.status(200).send({ status: "success", data: comidas });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(404).send({ status: "error", data: err });
  }
});


router.post("/registro", async (req, res) => {
  console.log("comida registro: ", req.body);

  try {
      const email = req.body.comida;
      const password = req.body.password;

      await checkEmail(email);
      await checkPassword(password);
      await testEmail(email);

      if (await findComida(email)) {
          return { status: "error", msg: "La comida ya existe!" };
      }

      const comidaRegistrado = new comidasSchema.comidas(req.body);
      await comidaRegistrado.save();

      return res.status(200).send({ status: "success", data: comidaRegistrado });
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
          //Genera el token y devuelve un comida hacia la app
          token: User.generatecomidaToken2(user.comida),
      });
  };

  console.log("comida posta validando: ", req.body);
  if (!req.body.comida || !req.body.password) {
      
      return next(403);
  }

  try {
      console.log("comida posta: ", req.body.comida);
      const userResponse = await findComida(req.body.comida); //la comida que viene de la app lo busca en la bdd para ver si está registrado

      if (userResponse) {
          //Si el objeto es diferente a null
          const { user }: any = userResponse;
          console.log("comida encontrado: ", user);
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

router.put("/comida/:id", async (req, res) => {
  try {
    console.log("Id comida", req.params);
    const userUpdate = req.body;
    const idUser = req.params.id;
    const userUpdated = await comidasSchema.comidas.findByIdAndUpdate(
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

router.delete("/comida/:id", async (req, res) => {
  try {
    const userDelete = req.body;
    const idUser = req.params.id;
    const userDeleted = await comidasSchema.comidas.findByIdAndDelete(
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
