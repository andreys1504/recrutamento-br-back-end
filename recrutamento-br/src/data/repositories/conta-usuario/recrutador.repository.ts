import { Model, model } from "mongoose";
import { EntityToDocument } from "src/data/data-source/mongoose/entity-to-document";
import { Recrutador } from "src/domain/conta-usuario/entities/recrutador";
import { recrutadorSchema } from "src/data/data-source/mongoose/schemas/conta-usuario/recrutador.schema";
import { Injectable } from "@nestjs/common";
import { Entities } from "src/data/data-source/mongoose/entities";

interface Recrutador_Document extends EntityToDocument<Recrutador> {
}

@Injectable()
export class RecrutadorRepository {
    get model(): Model<Recrutador_Document> {
        return model<Recrutador_Document>(Entities.Recrutador, recrutadorSchema);
    }
}
