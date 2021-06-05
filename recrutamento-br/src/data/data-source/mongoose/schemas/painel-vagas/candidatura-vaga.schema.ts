import { model, Schema } from "mongoose";
import { Vaga } from "src/domain/painel-vagas/entities/vaga";
import { Entities } from "../../entities";
import { EntityToDocument } from "../../entity-to-document";
import { schemaOptions } from "../../schema-options";

const candidaturaVagaSchema = new Schema({
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

interface CandidaturaVaga_Document extends EntityToDocument<Vaga> {
}

export const CandidaturaVagaModel = model<CandidaturaVaga_Document>(Entities.CandidaturaVaga, candidaturaVagaSchema);