import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AutenticacaoAppService } from 'src/domain/conta-usuario/application-services/usuario/autenticacao/autenticacao.app-service';
import { AutenticacaoRequest } from 'src/domain/conta-usuario/application-services/usuario/autenticacao/autenticacao.request';
import { CadastroUsuarioCandidatoAppService } from 'src/domain/conta-usuario/application-services/usuario/cadastro-usuario-candidato/cadastro-usuario-candidato.app-service';
import { CadastroUsuarioCandidatoRequest } from 'src/domain/conta-usuario/application-services/usuario/cadastro-usuario-candidato/cadastro-usuario-candidato.request';
import { CadastroUsuarioRecrutadorAppService } from 'src/domain/conta-usuario/application-services/usuario/cadastro-usuario-recrutador/cadastro-usuario-recrutador.app-service';
import { CadastroUsuarioRecrutadorRequest } from 'src/domain/conta-usuario/application-services/usuario/cadastro-usuario-recrutador/cadastro-usuario-recrutador.request';
import { AllowAnonymous } from '../configurations/security-routes/roles.decorator';
import { TokenService } from '../configurations/security-routes/token.service';
import { AutenticarRequestApi } from '../models/request-api/conta-usuario/autenticar/autenticar.request-api';
import { CadastrarUsuarioCandidatoRequestApi } from '../models/request-api/conta-usuario/cadastrar-candidato/cadastrar-usuario-candidato.request-api';
import { CadastrarUsuarioRecrutadorRequestApi } from '../models/request-api/conta-usuario/cadastrar-recrutador/cadastrar-usuario-recrutador.request-api';

@ApiTags('conta-usuario')
@Controller('conta-usuario')
export class ContaUsuarioController {
  constructor(
    private readonly autenticacaoAppService: AutenticacaoAppService,
    private readonly tokenService: TokenService,
    private readonly cadastroUsuarioRecrutadorAppService: CadastroUsuarioRecrutadorAppService,
    private readonly cadastroUsuarioCandidatoAppService: CadastroUsuarioCandidatoAppService,
  ) {}

  @Post('autenticar')
  @AllowAnonymous()
  @HttpCode(200)
  async autenticar(
    @Body() body: AutenticarRequestApi
  ) {
    var request = new AutenticacaoRequest(body.email, body.senha);
    const response = await this.autenticacaoAppService.handleAsync(request);

    if (response.success === false) return response;

    const token = await this.tokenService.createTokenAsync(
      response.data.idUsuario,
      response.data.idCandidatoRecrutador,
      response.data.email,
      response.data.permissoes,
    );

    return {
      usuario: response.data,
      token: token,
    };
  }

  @Post('cadastrar-candidato')
  @AllowAnonymous()
  async cadastrarUsuarioCandidato(
    @Body() body: CadastrarUsuarioCandidatoRequestApi,
  ) {
    var request = new CadastroUsuarioCandidatoRequest(
      body.email,
      body.senha,
      body.nome,
    );
    return await this.cadastroUsuarioCandidatoAppService.handleAsync(request);
  }

  @Post('cadastrar-recrutador')
  @AllowAnonymous()
  async cadastrarUsuarioRecrutador(
    @Body() body: CadastrarUsuarioRecrutadorRequestApi,
  ) {
    var request = new CadastroUsuarioRecrutadorRequest(
      body.email,
      body.senha,
      body.nome,
    );
    return await this.cadastroUsuarioRecrutadorAppService.handleAsync(request);
  }
}
