import { Schema, model } from 'mongoose';
import { schemaOptions } from 'src/data/data-source/mongoose/schema-options';
import { EntityToDocument } from 'src/data/data-source/mongoose/entity-to-document';
import { Recrutador } from '../../../../../domain/conta-usuario/entities/recrutador';
import { Entities } from '../../entities';

const recrutadorSchema = new Schema({
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
        required: true,
    },
}, 
{
    ...schemaOptions,
    collection: 'recrutadores'
});

interface Recrutador_Document extends EntityToDocument<Recrutador> {
}

export const RecrutadorModel = model<Recrutador_Document>(Entities.Recrutador, recrutadorSchema);