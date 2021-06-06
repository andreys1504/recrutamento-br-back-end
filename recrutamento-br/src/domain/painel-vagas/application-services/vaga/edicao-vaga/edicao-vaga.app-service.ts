import { AppService } from 'src/core/domain/application-services/service/app-service';
import { ResponseServiceModel } from 'src/core/domain/application-services/response/response-service';
import { EdicaoVagaDataResponse } from './edicao-vaga.data-response';
import { EdicaoVagaRequest } from './edicao-vaga.request';
import { VagaRepository } from 'src/data/repositories/painel-vagas/vaga-repository';
import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { Scheduler } from 'rxjs';
import { Schema } from 'mongoose';
import { Entities } from 'src/data/data-source/mongoose/entities';

@Injectable()
export class EdicaoVagaAppService extends AppService<EdicaoVagaDataResponse> {
  constructor(private readonly vagaRepository: VagaRepository) {
    super();
  }

  async handleAsync(
    request: EdicaoVagaRequest,
  ): Promise<ResponseServiceModel<EdicaoVagaDataResponse>> {
    if (request.validate() === false) {
      return this.returnNotifications(request.notifications);
    }

    const vagaPorTitulo = await this.vagaRepository.model
      .findOne(
        {
          titulo: request.titulo,
          _id: { $ne: request.idVaga },
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
      return this.returnNotification(
        'titulo',
        'Existe outra vaga no sistema com este título',
      );
    }

    await this.vagaRepository.model
      .findByIdAndUpdate(request.idVaga, {
        titulo: request.titulo,
        descricao: request.descricao,
        tags: request.tags,
      })
      .populate({
        path: Entities.Recrutador,
        select: '_id',
        match: { _id: request.idRecrutador },
        model: Entities.Vaga,
      })
      .exec();

    const vagaAtualizada = await this.vagaRepository.model
      .findById(request.idVaga)
      .exec();

    return this.returnData({
      id: vagaAtualizada.id,
      titulo: vagaAtualizada.titulo,
      descricao: vagaAtualizada.descricao,
      tags: vagaAtualizada.tags,
      idRecrutador: vagaAtualizada.recrutador.toString(),
    });
  }
}
