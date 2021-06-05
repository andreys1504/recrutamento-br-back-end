import { Injectable } from '@nestjs/common';
import { RolesApi } from 'src/core/authorizations/roles-api';
import { AppService } from 'src/core/domain/application-services/service/app-service';
import { ResponseServiceModel } from 'src/core/domain/application-services/response/response-service';
import { DomainException } from 'src/core/domain/exceptions/domain.exception';
import { CryptographyHelpers } from 'src/core/helpers/cryptography.helpers';
import { RecrutadorModel } from 'src/data/data-source/mongoose/schemas/conta-usuario/recrutador.schema';
import { UsuarioModel } from 'src/data/data-source/mongoose/schemas/conta-usuario/usuario.schema';
import { CadastroUsuarioRecrutadorRequest } from './cadastro-usuario-recrutador.request';

@Injectable()
export class CadastroUsuarioRecrutadorAppService extends AppService<boolean> {
  async handleAsync(
    request: CadastroUsuarioRecrutadorRequest,
  ): Promise<ResponseServiceModel<boolean>> {
    if (request.validate() === false)
      return this.returnNotifications(request.notifications);

    const usuarioPorEmail = await UsuarioModel.findOne({
      email: request.email,
    }).exec();

    if (usuarioPorEmail)
      return this.returnNotification('email', 'Usuário existente no sistema');

    let idUsuario: string;
    let idRecrutador: string;

    try {
      const usuarioModel = new UsuarioModel({
        email: request.email,
        senha: CryptographyHelpers.encryptPassword(request.senha),
        perfil: RolesApi.Recrutador,
      });
      await usuarioModel.save();
      idUsuario = usuarioModel._id;

      const recrutadorModel = new RecrutadorModel({
        nome: request.nome,
        ativo: true,
        usuario: usuarioModel.toObject(),
      });
      await recrutadorModel.save();
      idRecrutador = recrutadorModel._id;
    } catch(error) {
      await UsuarioModel.deleteOne({ _id: idUsuario }).exec();
      await RecrutadorModel.deleteOne({ _id: idRecrutador }).exec();

      throw new DomainException('Erro no cadastro do usuário');
    }

    return this.returnSuccess();
  }
}
