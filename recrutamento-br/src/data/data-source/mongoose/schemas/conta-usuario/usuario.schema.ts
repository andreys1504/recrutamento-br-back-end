import { Schema } from "mongoose";
import { schemaOptions } from "src/data/data-source/mongoose/schema-options";

export const usuarioSchema = new Schema({
    email: {
        type: String,
        trim: true,
        index: {
            unique: true,
        },
    },
    senha: {
        type: String,
        trim: true
    },
    perfil: {
        type: String,
        trim: true
    },
}, 
{
    ...schemaOptions,
    collection: 'usuarios'
});
