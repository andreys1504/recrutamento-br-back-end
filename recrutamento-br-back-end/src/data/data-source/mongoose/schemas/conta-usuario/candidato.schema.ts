import { Schema } from 'mongoose';
import { schemaOptions } from 'src/data/data-source/mongoose/schema-options';
import { Entities } from '../../entities';

export const candidatoSchema = new Schema({
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
