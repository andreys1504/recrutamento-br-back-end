import { IAggregate } from "../../../core/domain/entities/aggregate";
import { Candidato } from "../../conta-usuario/entities/candidato";
import { Vaga } from "./vaga";

export interface CandidaturaVaga extends IAggregate<Vaga> {
    vagaId: string;
    vaga: Vaga;
    candidatoId: string;
    candidato: Candidato;
    urlCurriculo: string;
}
