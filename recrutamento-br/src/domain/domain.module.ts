import { Module } from '@nestjs/common';
import { AutenticacaoAppService } from './conta-usuario/application-services/usuario/autenticacao/autenticacao.app-service';
import { CadastroUsuarioCandidatoAppService } from './conta-usuario/application-services/usuario/cadastro-usuario-candidato/cadastro-usuario-candidato.app-service';
import { CadastroUsuarioRecrutadorAppService } from './conta-usuario/application-services/usuario/cadastro-usuario-recrutador/cadastro-usuario-recrutador.app-service';
import { CadastroVagaAppService } from './painel-vagas/application-services/cadastro-vaga/cadastro-vaga.app-service';
import { EdicaoVagaAppService } from './painel-vagas/application-services/edicao-vaga/edicao-vaga.app-service';

@Module({
  imports: [],
  providers: [
    //cadastro-vaga
    AutenticacaoAppService,
    CadastroUsuarioCandidatoAppService,
    CadastroUsuarioRecrutadorAppService,

    //painel-vagas
    CadastroVagaAppService,
    EdicaoVagaAppService
  ],
  exports: [
    //cadastro-vaga
    AutenticacaoAppService,
    CadastroUsuarioCandidatoAppService,
    CadastroUsuarioRecrutadorAppService,

    //painel-vagas
    CadastroVagaAppService,
    EdicaoVagaAppService
  ],
})
export class DomainModule {}
