import { AppService } from '../../../../../core/domain/application-services/service/app-service';
import { ResponseAppService } from '../../../../../core/domain/application-services/response/response-app-service';
import { EdicaoVagaDataResponse } from './edicao-vaga.data-response';
import { EdicaoVagaRequest } from './edicao-vaga.request';
import { VagaRepository } from '../../../../../data/repositories/painel-vagas/vaga-repository';
import { Injectable } from '@nestjs/common';
import { Vaga } from '../../../../../domain/painel-vagas/entities/vaga';

@Injectable()
export class EdicaoVagaAppService extends AppService<EdicaoVagaDataResponse> {
  constructor(private readonly vagaRepository: VagaRepository) {
    super();
  }

  async handleAsync(
    request: EdicaoVagaRequest,
  ): Promise<ResponseAppService<EdicaoVagaDataResponse>> {
    if (request.validate() === false) {
      return this.returnNotifications(request.getNotifications);
    }

    const vagaPorTitulo = await this.vagaRepository.buscar(
      {
        titulo: request.titulo,
        id: { $ne: request.idVaga },
        recrutadorId: request.idRecrutador,
      } as Vaga,
      'titulo',
    );

    if (vagaPorTitulo) {
      return this.returnNotification(
        'titulo',
        'Existe outra vaga no sistema com este título',
      );
    }

    const vaga = await this.vagaRepository.atualizar(
      request.idVaga,
      request.idRecrutador,
      {
        titulo: request.titulo,
        descricao: request.descricao,
        tags: request.tags,
      },
    );

    return this.returnData({
      id: vaga.id,
      titulo: vaga.titulo,
      descricao: vaga.descricao,
      tags: vaga.tags,
      idRecrutador: vaga.recrutadorId,
    });
  }
}
