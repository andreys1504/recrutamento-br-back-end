import { Entity } from "src/core/domain/entities/entity-base/entity";
import { Recrutador } from "src/domain/conta-usuario/entities/recrutador";

export interface Vaga extends Entity {
    titulo: string;
    descricao: string;
    tags: string[];
    recrutador: Recrutador;
}
