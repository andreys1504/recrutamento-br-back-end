import { Schema } from 'mongoose';
import { Candidato } from '../../../../../domain/conta-usuario/entities/candidato';
import { schemaOptions } from '../../../../../data/data-source/mongoose/schema-options';
import { Entities } from '../../../../../core/data/entities';
import { EntityToDocument } from '../../entity-to-document';

export type CandidatoDocument = EntityToDocument<Candidato>;

export const candidatoSchema = new Schema({
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
    },
}, 
{
    ...schemaOptions,
    collection: 'candidatos'
});
