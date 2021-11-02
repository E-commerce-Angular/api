import * as mongoose from "mongoose";
const bcrypt = require("bcrypt");

export const UsuarioSchema = new mongoose.Schema({
    usuario: { type: String, required: true },
    nombreUsuario: { type: String, required: true, lowercase: true },
    apellidoUsuario: { type: String, required: true, lowercase: true },
    pics: {type: String},
    dni: Number,
    password: {type: String, required: true}
});

UsuarioSchema.pre("save", function (next) {
    let user: any = this;
    const SALT_FACTOR = 12;

    if (!user.isModified("password")) {
        return next();
    }

    //we generate the salt using 12 rounds and then use that salt with the received password string to generate our hash
    bcrypt
        .genSalt(SALT_FACTOR)
        .then((salt) => {
            return bcrypt.hash(user.password, salt);
        })
        .then((hash) => {
            user.password = hash;
            next();
        })
        .catch((err) => next(err));
});


export let usuarios = mongoose.model("Usuario", UsuarioSchema, "usuarios");


