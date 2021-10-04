import { UsuarioSchema } from 'modules/usuarios/schemas/usuarios';
import * as mongoose from 'mongoose';
import  * as userSchema from './schemas/autenticaciones';

const sha1Hash = require('sha1');

/**
 * Recupera los datos necesarios de un Usuario.
 * User y Profesional
 */

export async function findUser(username) {
    const userAuth = await userSchema.usuarios.findOne({ usuario: username }); //Se fija si el usuario existe en la bdd
    console.log("USer auth: ", userAuth);
    if (userAuth) {
        return {
            user: userAuth
        };
    }
    return null;
}