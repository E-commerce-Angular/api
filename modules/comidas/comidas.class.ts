import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as passportJWT from 'passport-jwt';
import * as configPrivate from '../../config.private';


export class User {

    static expiresIn = 60 * 60 * 24 * 10; /* 10 días */
    static expiresInTemporaly = 60 * 5;

    static initialize(app: express.Express) {
        // Configura passport para que utilice JWT
        passport.use(new passportJWT.Strategy(
            {
                secretOrKey: configPrivate.auth.jwtKey,
                jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([
                    passportJWT.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
                    passportJWT.ExtractJwt.fromUrlQueryParameter('token')
                ])
            },
            (jwt_payload, done) => {
                done(null, jwt_payload);
            }
        ));

        // Inicializa passport
        app.use(passport.initialize());

    }

    /**
     * Version dos del token. Con menos datos.
     * Solo posee la comidaname y el password.
     */

    static generatecomidaToken2(comidaname: string, account_id = null): any {
        // Crea el token con los datos de sesión
        const token: any = {
            id: mongoose.Types.ObjectId(),
            comida: comidaname,
            account_id,
            type: 'user-token-2'
        };
        return jwt.sign(token, configPrivate.auth.jwtKey, { expiresIn: this.expiresIn });
    }

}
