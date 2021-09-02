import * as express from "express";
import { productos } from "modules/productos/schemas/productos";
import * as usuariosSchema from "../schemas/usuarios";


const router = express.Router();

router.get("/usuarios", async (request, response) => {
    try {
        console.log("Entra a usuarios!!!");
        let usuarios = await usuariosSchema.usuarios.find();

        console.log("usuarios registrados!!!", usuarios);
        return response.status(200).send({ status: "success", data: usuarios });
    } catch (err) {
        console.log("Error: ", err)
        return response.status(404).send({ status: "error", data: err });
    }
});


router.post("/usuarios", async (req, response) => {
    try {
        console.log("entre a postman")
        const usuarios = new usuariosSchema.usuarios(req.body); 
        const usuarioNuevo = await usuarios.save(); 
        return response.status(200).send({ status: "succes", data: usuarioNuevo });
    }catch (err) {
        console.log("Error: ", err)
        return response.status(404).send({ status: "error", data: err });
    }


// function signUp(req, res){
//     const user = new User({
//         nombreUsuario: req.body.nombreUsuario,
//         apellidoUsuario: req.body.apellidoUsuario,
//         dni: req.body.dni
//     })

//     user.save((err) =>{
//         if(err) res.status(500).send({message: `Error al crear el usuario ${err}`})
//     })
//     return res.status(200).send("Desde aca")
// }

// function signIn(req, res){
//     User.find({email: req.body.email}, (err,user)=>{
//         if(err) return res.status(500).send({message: err})
//         if(!user) return res.status(404).send({message: 'No existe el usuario!'})
        
//         req.user =  user
//         res.status(200).send({
//             message: 'Logueo exitoso',
            
//         })
//     })
// }


export = router; 
//    , signIn, signUp


