import { model, Schema, Model } from "mongoose";
import { schemaOptions } from "src/data/data-source/mongoose/schema-options";
import { EntityToDocument } from "src/data/data-source/mongoose/entity-to-document";
import { Usuario } from "../../../../../domain/conta-usuario/entities/usuario";
import { Entities } from "../../entities";

const usuarioSchema = new Schema({
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

interface Usuario_Document extends EntityToDocument<Usuario> {
}

export const UsuarioModel: Model<Usuario_Document> = model(Entities.Usuario, usuarioSchema);