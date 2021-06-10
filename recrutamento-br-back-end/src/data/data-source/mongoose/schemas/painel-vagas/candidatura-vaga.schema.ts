import { Schema } from "mongoose";
import { CandidaturaVaga } from "../../../../../domain/painel-vagas/entities/candidatura-vaga";
import { Entities } from "../../../../../core/data/entities";
import { EntityToDocument } from "../../entity-to-document";
import { schemaOptions } from "../../schema-options";

export type CandidaturaVagaDocument = EntityToDocument<CandidaturaVaga>;

export const candidaturaVagaSchema = new Schema({
    vagaId: {
        type: String,
        trim: true
    },
    vaga: {
        type: Schema.Types.ObjectId,
        ref: Entities.Vaga
    },
    candidatoId: {
        type: String,
        trim: true
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
