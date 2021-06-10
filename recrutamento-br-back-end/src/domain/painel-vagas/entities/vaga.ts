import { IAggregateRoot } from "../../../core/domain/entities/aggregate-root";
import { Recrutador } from "../../conta-usuario/entities/recrutador";

export interface Vaga extends IAggregateRoot {
    titulo: string;
    descricao: string;
    tags: string[];
    recrutadorId: string;
    recrutador: Recrutador;
}
