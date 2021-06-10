import { Injectable } from "@nestjs/common";
import { model } from "mongoose";
import { Entities } from "../../../core/data/entities";
import { CandidatoDocument, candidatoSchema } from "../../../data/data-source/mongoose/schemas/conta-usuario/candidato.schema";
import { Candidato } from "../../../domain/conta-usuario/entities/candidato";
import { Repository } from "../repository";

@Injectable()
export class CandidatoRepository extends Repository<CandidatoDocument, Candidato> {
    constructor() {
        const candidatoModel = model<CandidatoDocument>(Entities.Candidato, candidatoSchema);
        super(candidatoModel);
    }

    async cadastrar(candidato: {
        nome: string,
        ativo: boolean,
        idUsuario: string,
    }): Promise<Candidato> {
        return await this.create({
            nome: candidato.nome,
            ativo: candidato.ativo,
            usuarioId: candidato.idUsuario,
            usuario: candidato.idUsuario
        });
    }
}
