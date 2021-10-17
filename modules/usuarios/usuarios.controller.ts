import * as usuarioSchema from './schemas/usuarios'; 

const sha1Hash = require('sha1');

/**
 * Recupera los datos necesarios de un Usuario.
 */


export async function findUser(username) {
    const userAuth = await usuarioSchema.usuarios.findOne({ usuario: username }); //Se fija si el usuario existe en la bdd
    console.log("User auth: ", userAuth);
    if (userAuth) {
        return {
            user: userAuth
        };
    }
    return null;
}