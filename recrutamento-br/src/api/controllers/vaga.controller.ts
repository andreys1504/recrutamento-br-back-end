import { Body, Controller, Post, Put, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesApi } from 'src/core/authorizations/roles-api';
import { CadastroVagaAppService } from 'src/domain/painel-vagas/application-services/cadastro-vaga/cadastro-vaga.app-service';
import { CadastroVagaRequest } from 'src/domain/painel-vagas/application-services/cadastro-vaga/cadastro-vaga.request';
import { EdicaoVagaAppService } from 'src/domain/painel-vagas/application-services/edicao-vaga/edicao-vaga.app-service';
import { EdicaoVagaRequest } from 'src/domain/painel-vagas/application-services/edicao-vaga/edicao-vaga.request';
import { Roles } from '../configurations/security-routes/roles.decorator';
import { TokenPayload } from '../configurations/security-routes/token.payload';
import { CadastrarVagaRequestApi } from '../models/request-api/vaga/cadastro/cadastrar-vaga.request-api';
import { EditarVagaRequestApi } from '../models/request-api/vaga/edicao/editar-vaga.request-api';

@ApiTags('vagas')
@Controller('vagas')
export class VagaController {
  constructor(
    private readonly cadastroVagaAppService: CadastroVagaAppService,
    private readonly edicaoVagaAppService: EdicaoVagaAppService,
  ) {}

  @Post()
  @Roles(RolesApi.Recrutador)
  async CadastrarVaga(@Body() body: CadastrarVagaRequestApi, @Req() req: any) {
    var request = new CadastroVagaRequest(
      body.tituloVaga,
      body.descricao,
      body.tags,
      (req.user as TokenPayload).idCandidatoRecrutador,
    );
    return await this.cadastroVagaAppService.handleAsync(request);
  }

  @Put()
  @Roles(RolesApi.Recrutador)
  async EditarVaga(@Body() body: EditarVagaRequestApi, @Req() req: any) {
    var request = new EdicaoVagaRequest(
      body.idVaga,
      body.tituloVaga,
      body.descricao,
      body.tags,
      (req.user as TokenPayload).idCandidatoRecrutador,
    );
    return await this.edicaoVagaAppService.handleAsync(request);
  }
}
