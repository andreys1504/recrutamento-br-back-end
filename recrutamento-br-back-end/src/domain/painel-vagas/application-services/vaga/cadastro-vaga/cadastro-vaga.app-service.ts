import { AppService } from '../../../../../core/domain/application-services/service/app-service';
import { ResponseServiceModel } from '../../../../../core/domain/application-services/response/response-service';
import { CadastroVagaDataResponse } from './cadastro-vaga.data-response';
import { CadastroVagaRequest } from './cadastro-vaga.request';
import { VagaRepository } from '../../../../../data/repositories/painel-vagas/vaga-repository';
import { Injectable } from '@nestjs/common';
import { Vaga } from '../../../../../domain/painel-vagas/entities/vaga';

@Injectable()
export class CadastroVagaAppService extends AppService<CadastroVagaDataResponse> {
  constructor(private readonly vagaRepository: VagaRepository) {
    super();
  }

  async handleAsync(
    request: CadastroVagaRequest,
  ): Promise<ResponseServiceModel<CadastroVagaDataResponse>> {
    if (request.validate() === false) {
      return this.returnNotifications(request.notifications);
    }
    const vagaPorTitulo = await this.vagaRepository
      .buscar(
        {
          titulo: request.requestModel.titulo,
          recrutadorId: request.requestModel.idRecrutador
        } as Vaga,
        'titulo'
      );

    if (vagaPorTitulo) {
      return this.returnNotification('titulo', 'Vaga existente no sistema');
    }

    const vaga = await this.vagaRepository.cadastrar({
      titulo: request.requestModel.titulo,
      descricao: request.requestModel.descricao,
      tags: request.requestModel.tags,
      idRecrutador: request.requestModel.idRecrutador
    });

    return this.returnData({
      id: vaga.id,
      titulo: vaga.titulo,
      descricao: vaga.descricao,
      tags: vaga.tags,
      idRecrutador: vaga.recrutador.toString(),
    });
  }
}
