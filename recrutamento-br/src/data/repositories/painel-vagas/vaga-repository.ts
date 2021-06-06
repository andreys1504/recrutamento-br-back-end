import { Injectable } from "@nestjs/common";
import { model, Model } from "mongoose";
import { Entities } from "src/data/data-source/mongoose/entities";
import { EntityToDocument } from "src/data/data-source/mongoose/entity-to-document";
import { vagaSchema } from "src/data/data-source/mongoose/schemas/painel-vagas/vaga.schema";
import { Vaga } from "src/domain/painel-vagas/entities/vaga";
import { candidaturaVagaSchema } from "src/data/data-source/mongoose/schemas/painel-vagas/candidatura-vaga.schema";
import { CandidaturaVaga } from "src/domain/painel-vagas/entities/candidatura-vaga";

interface Vaga_Document extends EntityToDocument<Vaga> {
}

interface CandidaturaVaga_Document extends EntityToDocument<CandidaturaVaga> {
}

@Injectable()
export class VagaRepository {
    get model(): Model<Vaga_Document> {
        return model<Vaga_Document>(Entities.Vaga, vagaSchema);
    }

    get modelCandidaturaVaga(): Model<CandidaturaVaga_Document> {
        return model<CandidaturaVaga_Document>(Entities.CandidaturaVaga, candidaturaVagaSchema);
    }
}
