import { AppService } from 'src/core/domain/application-services/service/app-service';
import { ResponseServiceModel } from 'src/core/domain/application-services/response/response-service';
import { VagaModel } from 'src/data/data-source/mongoose/schemas/painel-vagas/vaga.schema';
import { EdicaoVagaDataResponse } from './edicao-vaga.data-response';
import { EdicaoVagaRequest } from './edicao-vaga.request';

export class EdicaoVagaAppService extends AppService<EdicaoVagaDataResponse> {
  async handleAsync(
    request: EdicaoVagaRequest,
  ): Promise<ResponseServiceModel<EdicaoVagaDataResponse>> {
    if (request.validate() === false)
      return this.returnNotifications(request.notifications);

    const vagaPorTitulo = await VagaModel.findOne(
      {
        titulo: request.titulo,
        _id: { $ne: request.idVaga },
      },
      '_id',
    )
      .populate({
        path: 'recrutador',
        match: { _id: request.idRecrutador },
        select: '_id',
      })
      .exec();

    if (vagaPorTitulo) {
      return this.returnNotification(
        'titulo',
        'Existe outra vaga no sistema com este título',
      );
    }

    await VagaModel.findByIdAndUpdate(request.idVaga, {
      titulo: request.titulo,
      descricao: request.descricao,
      tags: request.tags,
    })
      .populate({
        path: 'recrutador',
        match: { _id: request.idRecrutador },
        select: '_id',
      })
      .exec();

    const vagaAtualizada = await VagaModel.findById(request.idVaga).exec();

    return this.returnData({
        id: vagaAtualizada.id,
        titulo: vagaAtualizada.titulo,
        descricao: vagaAtualizada.descricao,
        tags: vagaAtualizada.tags,
        idRecrutador: vagaAtualizada.recrutador.toString()
    });
  }
}
