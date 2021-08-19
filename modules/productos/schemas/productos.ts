import * as mongoose from "mongoose";

export const ProductoSchema = new mongoose.Schema({
    nombreProducto: { type: String, required: true, lowercase: true },
    precio: Number,
});

export let productos = mongoose.model("Producto", ProductoSchema, "productos");
