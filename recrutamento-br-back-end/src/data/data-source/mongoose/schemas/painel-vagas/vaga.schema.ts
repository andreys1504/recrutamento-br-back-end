import { Schema } from "mongoose";
import { Entities } from "../../entities";
import { schemaOptions } from "../../schema-options";

export const vagaSchema = new Schema({
    titulo: {
        type: String,
        trim: true,
    },
    descricao: {
        type: String,
        trim: true,
    },
    tags: [{
        type: String,
        trim: true,
    }],
    recrutador: {
        type: Schema.Types.ObjectId,
        ref: Entities.Recrutador
    }
}, 
{
    ...schemaOptions,
    collection: 'vagas'
});
