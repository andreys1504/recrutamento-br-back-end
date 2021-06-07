import { AppService } from 'src/core/domain/application-services/service/app-service';
import { ResponseServiceModel } from 'src/core/domain/application-services/response/response-service';
import { CadastroVagaDataResponse } from './cadastro-vaga.data-response';
import { CadastroVagaRequest } from './cadastro-vaga.request';
import { VagaRepository } from 'src/data/repositories/painel-vagas/vaga-repository';
import { Injectable } from '@nestjs/common';
import { Entities } from 'src/data/data-source/mongoose/entities';

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

    const vagaPorTitulo = await this.vagaRepository.model
      .findOne(
        {
          titulo: request.titulo,
        },
        'titulo',
      )
      .populate({
        path: Entities.Recrutador,
        select: '_id',
        match: { _id: request.idRecrutador },
        model: Entities.Vaga,
      })
      .exec();

    if (vagaPorTitulo) {
      return this.returnNotification('titulo', 'Vaga existente no sistema');
    }

    const vagaModel = new this.vagaRepository.model({
      titulo: request.titulo,
      descricao: request.descricao,
      tags: request.tags,
      recrutador: request.idRecrutador,
    });
    await vagaModel.save();

    return this.returnData({
      id: vagaModel._id,
      titulo: vagaModel.titulo,
      descricao: vagaModel.descricao,
      tags: vagaModel.tags,
      idRecrutador: vagaModel.recrutador.toString(),
    });
  }
}
