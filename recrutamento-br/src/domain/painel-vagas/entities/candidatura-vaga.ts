import { IAggregate } from "src/core/domain/entities/aggregate";
import { Candidato } from "src/domain/conta-usuario/entities/candidato";
import { Vaga } from "./vaga";

export interface CandidaturaVaga extends IAggregate<Vaga> {
    vaga: Vaga;
    candidato: Candidato;
    urlCurriculo: string;
}
