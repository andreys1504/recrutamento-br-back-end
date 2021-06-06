import { Schema } from "mongoose";
import { Entities } from "../../entities";
import { schemaOptions } from "../../schema-options";

export const candidaturaVagaSchema = new Schema({
    vaga: {
        type: Schema.Types.ObjectId,
        ref: Entities.Vaga
    },
    candidato: {
        type: Schema.Types.ObjectId,
        ref: Entities.Candidato
    },
    urlCurriculo: {
        type: String,
        trim: true
    }
}, 
{
    ...schemaOptions,
    collection: 'candidaturasVagas'
});
