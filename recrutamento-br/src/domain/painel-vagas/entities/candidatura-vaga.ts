import { Entity } from "src/core/domain/entities/entity-base/entity";
import { Candidato } from "src/domain/conta-usuario/entities/candidato";
import { Vaga } from "./vaga";

export interface CandidaturaVaga extends Entity {
    vaga: Vaga;
    candidato: Candidato;
    urlCurriculo: string;
}
