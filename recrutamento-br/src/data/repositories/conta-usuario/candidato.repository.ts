import { Injectable } from "@nestjs/common";
import { Model, model } from "mongoose";
import { Entities } from "src/data/data-source/mongoose/entities";
import { EntityToDocument } from "src/data/data-source/mongoose/entity-to-document";
import { candidatoSchema } from "src/data/data-source/mongoose/schemas/conta-usuario/candidato.schema";
import { Candidato } from "src/domain/conta-usuario/entities/candidato";

interface Candidato_Document extends EntityToDocument<Candidato> {
}

@Injectable()
export class CandidatoRepository {
    get model(): Model<Candidato_Document> {
        return model<Candidato_Document>(Entities.Candidato, candidatoSchema);
    }
}
