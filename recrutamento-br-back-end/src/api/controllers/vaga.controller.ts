import { Body, Controller, Post, Put, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesApi } from '../../core/authorizations/roles-api';
import { CadastroVagaAppService } from '../../domain/painel-vagas/application-services/vaga/cadastro-vaga/cadastro-vaga.app-service';
import { CadastroVagaRequest } from '../../domain/painel-vagas/application-services/vaga/cadastro-vaga/cadastro-vaga.request';
import { EdicaoVagaAppService } from '../../domain/painel-vagas/application-services/vaga/edicao-vaga/edicao-vaga.app-service';
import { EdicaoVagaRequest } from '../../domain/painel-vagas/application-services/vaga/edicao-vaga/edicao-vaga.request';
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
  async cadastrarVaga(@Body() body: CadastrarVagaRequestApi, @Req() req: any) {
    var request = new CadastroVagaRequest({
      titulo: body.tituloVaga,
      descricao: body.descricao,
      tags: body.tags,
      idRecrutador: (req.user as TokenPayload).idCandidatoRecrutador,
    });
    return await this.cadastroVagaAppService.handleAsync(request);
  }

  @Put()
  @Roles(RolesApi.Recrutador)
  async editarVaga(@Body() body: EditarVagaRequestApi, @Req() req: any) {
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
