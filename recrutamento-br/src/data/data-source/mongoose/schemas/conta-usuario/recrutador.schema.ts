import { Schema } from 'mongoose';
import { schemaOptions } from 'src/data/data-source/mongoose/schema-options';
import { Entities } from '../../entities';

export const recrutadorSchema = new Schema({
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
