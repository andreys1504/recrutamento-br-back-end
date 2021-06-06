import { Injectable } from '@nestjs/common';
import { RolesApi } from 'src/core/authorizations/roles-api';
import { AppService } from 'src/core/domain/application-services/service/app-service';
import { ResponseServiceModel } from 'src/core/domain/application-services/response/response-service';
import { DomainException } from 'src/core/domain/exceptions/domain.exception';
import { CryptographyHelpers } from 'src/core/helpers/cryptography.helpers';
import { CadastroUsuarioRecrutadorRequest } from './cadastro-usuario-recrutador.request';
import { UsuarioRepository } from 'src/data/repositories/conta-usuario/usuario.repository';
import { RecrutadorRepository } from 'src/data/repositories/conta-usuario/recrutador.repository';

@Injectable()
export class CadastroUsuarioRecrutadorAppService extends AppService<boolean> {
  constructor(
    private readonly recrutadorRepository: RecrutadorRepository,
    private readonly usuarioRepository: UsuarioRepository,
  ) {
    super();
  }
  
  async handleAsync(
    request: CadastroUsuarioRecrutadorRequest,
  ): Promise<ResponseServiceModel<boolean>> {
    if (request.validate() === false) {
      return this.returnNotifications(request.notifications);
    }

    const usuarioPorEmail = await this.usuarioRepository.model.findOne({
      email: request.email,
    }).exec();

    if (usuarioPorEmail) {
      return this.returnNotification('email', 'Usuário existente no sistema');
    }

    let idUsuario: string;
    let idRecrutador: string;

    try {
      const usuarioModel = new this.usuarioRepository.model({
        email: request.email,
        senha: CryptographyHelpers.encryptPassword(request.senha),
        perfil: RolesApi.Recrutador,
      });
      await usuarioModel.save();
      idUsuario = usuarioModel._id;

      const recrutadorModel = new this.recrutadorRepository.model({
        nome: request.nome,
        ativo: true,
        usuario: usuarioModel.toObject(),
      });
      await recrutadorModel.save();
      idRecrutador = recrutadorModel._id;
    } catch(error) {
      await this.usuarioRepository.model.deleteOne({ _id: idUsuario }).exec();
      await this.recrutadorRepository.model.deleteOne({ _id: idRecrutador }).exec();

      throw new DomainException('Erro no cadastro do usuário');
    }

    return this.returnSuccess();
  }
}
