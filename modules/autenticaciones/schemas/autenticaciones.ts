import * as mongoose from "mongoose";

export const AutenticacionSchema = new mongoose.Schema({
    usuario: { type: String, required: true, lowercase: true },
    nombreUsuario: { type: String, required: true, lowercase: true },
    apellidoUsuario: { type: String, required: true, lowercase: true },
    dni: Number,
    password: {type: String, required: true}
});

export let usuarios = mongoose.model("Autenticacion", AutenticacionSchema, "usuarios");


