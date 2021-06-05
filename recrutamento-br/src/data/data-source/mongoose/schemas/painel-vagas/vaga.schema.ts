import { model, Schema } from "mongoose";
import { Vaga } from "src/domain/painel-vagas/entities/vaga";
import { Entities } from "../../entities";
import { EntityToDocument } from "../../entity-to-document";
import { schemaOptions } from "../../schema-options";

const vagaSchema = new Schema({
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
        ref: Entities.Recrutador,
        require: true
    }
}, 
{
    ...schemaOptions,
    collection: 'vagas'
});

interface Vaga_Document extends EntityToDocument<Vaga> {
}

export const VagaModel = model<Vaga_Document>(Entities.Vaga, vagaSchema);
