import * as mongoose from "mongoose";

export const UsuarioSchema = new mongoose.Schema({
    nombreUsuario: { type: String, required: true, lowercase: true },
    apellidoUsuario: { type: String, required: true, lowercase: true },
    dni: Number
});

export let usuarios = mongoose.model("Usuario", UsuarioSchema, "usuarios");