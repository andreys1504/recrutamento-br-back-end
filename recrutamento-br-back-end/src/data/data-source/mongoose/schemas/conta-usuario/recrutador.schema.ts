import { Schema } from 'mongoose';
import { Recrutador } from '../../../../../domain/conta-usuario/entities/recrutador';
import { schemaOptions } from '../../../../../data/data-source/mongoose/schema-options';
import { Entities } from '../../../../../core/data/entities';
import { EntityToDocument } from '../../entity-to-document';

export type RecrutadorDocument = EntityToDocument<Recrutador>

export const recrutadorSchema = new Schema({
    nome: {
        type: String,
        trim: true,
    },
    ativo: {
        type: Boolean,
        trim: true,
    },
    usuarioId: {
        type: String,
        trim: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: Entities.Usuario,
        required: true,
    },
}, 
{
    ...schemaOptions,
    collection: 'recrutadores'
});
