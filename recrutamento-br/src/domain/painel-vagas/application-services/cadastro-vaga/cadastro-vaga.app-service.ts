import { AppService } from 'src/core/domain/application-services/service/app-service';
import { ResponseServiceModel } from 'src/core/domain/application-services/response/response-service';
import { VagaModel } from 'src/data/data-source/mongoose/schemas/painel-vagas/vaga.schema';
import { CadastroVagaDataResponse } from './cadastro-vaga.data-response';
import { CadastroVagaRequest } from './cadastro-vaga.request';

export class CadastroVagaAppService extends AppService<CadastroVagaDataResponse> {
  async handleAsync(
    request: CadastroVagaRequest,
  ): Promise<ResponseServiceModel<CadastroVagaDataResponse>> {
    if (request.validate() === false)
      return this.returnNotifications(request.notifications);

    const vagaPorTitulo = await VagaModel.findOne(
      {
        titulo: request.titulo
      },
      '_id',
    )
    .populate({ path: 'recrutador', match: { _id: request.idRecrutador }, select: '_id' })
    .exec();

    if (vagaPorTitulo) {
      return this.returnNotification('titulo', 'Vaga existente no sistema');
    }

    const vagaModel = new VagaModel({
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
      idRecrutador: vagaModel.recrutador.toString()
    });
  }
}
