import * as comidaschema from './schemas/comidas'; 

const sha1Hash = require('sha1');

/**
 * Recupera los datos necesarios de un comida.
 */


export async function findComida(comidaname) {
    const comidaAuth = await comidaschema.comidas.findOne({ comida: comidaname }); //Se fija si la comida existe en la bdd
    console.log("comida auth: ", comidaAuth);
    if (comidaAuth) {
        return {
            user: comidaAuth
        };
    }
    return null;
}