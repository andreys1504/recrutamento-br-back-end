import { Schema, model } from 'mongoose';
import { schemaOptions } from 'src/data/data-source/mongoose/schema-options';
import { EntityToDocument } from 'src/data/data-source/mongoose/entity-to-document';
import { Candidato } from '../../../../../domain/conta-usuario/entities/candidato';
import { Entities } from '../../entities';

const candidatoSchema = new Schema({
    nome: {
        type: String,
        trim: true,
    },
    ativo: {
        type: Boolean,
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

interface Candidato_Document extends EntityToDocument<Candidato> {
}

export const CandidatoModel = model<Candidato_Document>(Entities.Candidato, candidatoSchema);