import { Schema } from "mongoose";
import { Vaga } from "../../../../../domain/painel-vagas/entities/vaga";
import { Entities } from "../../../../../core/data/entities";
import { EntityToDocument } from "../../entity-to-document";
import { schemaOptions } from "../../schema-options";

export type VagaDocument = EntityToDocument<Vaga>;

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
    recrutadorId: {
        type: String,
        trim: true,
    },
    recrutador: {
        type: Schema.Types.ObjectId,
        ref: Entities.Recrutador
    }
}, 
{
    ...schemaOptions,
    collection: 'vagas'
});
