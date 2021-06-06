import { IAggregateRoot } from "src/core/domain/entities/aggregate-root";
import { Recrutador } from "src/domain/conta-usuario/entities/recrutador";

export interface Vaga extends IAggregateRoot {
    titulo: string;
    descricao: string;
    tags: string[];
    recrutador: Recrutador;
}
