import * as mongoose from 'mongoose';
// import { AndesDocWithAudit, AuditPlugin } from '@andes/mongoose-plugin-audit';
// import { ObjectId } from '@andes/core';

export interface IAutenticacionesUsers {
    // usuario: number;
    // activo: boolean;
    nombreUsuario: String,
    apellidoUsuario: String,
    dni: Number,
    password: String
    // foto: string;
    authMethod?: string;
    permisosGlobales: string[];
    // organizaciones: {
    //     _id: ObjectId;
    //     nombre: string;
    //     permisos: string[];
    //     activo: boolean;
    //     perfiles: {
    //         _id: ObjectId;
    //         nombre: string;
    //     }[];
    // }[];
    lastLogin: Date;
    tipo?: String;
    validationToken?: String;
    email?: String;
    configuracion?: { [key: string]: any };
    // disclaimers?: {
    //     _id: ObjectId;
    //     createdAt: Date;
    // }[];
}

// export type IAuthUsersDoc = AndesDocWithAudit<IAuthUsers>;

export const AutenticacionesUsersSchema = new mongoose.Schema({
    nombreUsuario: String,
    apellidoUsuario: String,
    dni: Number,
    password: String,
    authMethod: {
        type: String,
        required: false
    },
    permisosGlobales: [String],
    
    lastLogin: Date,
    tipo: {
        type: String,
        required: false
    },
    // email: {
    //     type: String,
    //     required: false
    // },
    validationToken: {
        type: String,
        required: false
    },
    configuracion: {
        type: mongoose.SchemaTypes.Mixed,
        default: {}
    }
    // disclaimers: [{ createdAt: Date, _id: { type: mongoose.Schema.Types.ObjectId, ref: 'dislaimer' } }],
});

// AutenticacionesUsersSchema.pre('save', function (next) {
//     const user: any = this;
//     user.organizaciones = user.organizaciones.sort(
//         (a, b) => {
//             if (a.nombre > b.nombre) {
//                 return 1;
//             }
//             if (a.nombre < b.nombre) {
//                 return -1;
//             }
//             return 0;
//         }
//     );
//     next();
// });

// AutenticacionesUsersSchema.plugin(AuditPlugin);

AutenticacionesUsersSchema.index({
    usuario: 1,
    'organizaciones._id': 1,
});
AutenticacionesUsersSchema.index({ validationToken: 1 });

export const AutenticacionesUsers = mongoose.model<IAutenticacionesUsersDoc>('authUsers', AutenticacionesUsersSchema, 'authUsers'); //Eso necesita los imports de andes
