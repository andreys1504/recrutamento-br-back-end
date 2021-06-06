import { Module } from "@nestjs/common";
import { CandidatoRepository } from "./repositories/conta-usuario/candidato.repository";
import { RecrutadorRepository } from "./repositories/conta-usuario/recrutador.repository";
import { UsuarioRepository } from "./repositories/conta-usuario/usuario.repository";
import { VagaRepository } from "./repositories/painel-vagas/vaga-repository";

@Module({
    providers: [
        //consta-usuario
        CandidatoRepository,
        RecrutadorRepository,
        UsuarioRepository,

        //painel-vagas
        VagaRepository,
    ],
    exports: [
        //consta-usuario
        CandidatoRepository,
        RecrutadorRepository,
        UsuarioRepository,

        //painel-vagas
        VagaRepository,
    ]
})
export class DataModule {}