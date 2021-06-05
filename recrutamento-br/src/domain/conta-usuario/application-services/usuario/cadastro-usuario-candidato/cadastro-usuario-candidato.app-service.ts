import { Injectable } from '@nestjs/common';
import { RolesApi } from 'src/core/authorizations/roles-api';
import { AppService } from 'src/core/domain/application-services/service/app-service';
import { ResponseServiceModel } from 'src/core/domain/application-services/response/response-service';
import { DomainException } from 'src/core/domain/exceptions/domain.exception';
import { CryptographyHelpers } from 'src/core/helpers/cryptography.helpers';
import { CandidatoModel } from 'src/data/data-source/mongoose/schemas/conta-usuario/candidato.schema';
import { UsuarioModel } from 'src/data/data-source/mongoose/schemas/conta-usuario/usuario.schema';
import { CadastroUsuarioCandidatoRequest } from './cadastro-usuario-candidato.request';

@Injectable()
export class CadastroUsuarioCandidatoAppService extends AppService<boolean> {
  async handleAsync(
    request: CadastroUsuarioCandidatoRequest,
  ): Promise<ResponseServiceModel<boolean>> {
    if (request.validate() === false)
      return this.returnNotifications(request.notifications);

    const usuarioPorEmail = await UsuarioModel.findOne({
      email: request.email,
    }).exec();

    if (usuarioPorEmail)
      return this.returnNotification('email', 'Usuário existente no sistema');

    let idUsuario: string;
    let idCandidato: string;

    try {
      const usuarioModel = new UsuarioModel({
        email: request.email,
        senha: CryptographyHelpers.encryptPassword(request.senha),
        perfil: RolesApi.Candidato,
      });
      await usuarioModel.save();
      idUsuario = usuarioModel._id;

      const candidatoModel = new CandidatoModel({
        nome: request.nome,
        ativo: true,
        usuario: usuarioModel.toObject(),
      });
      await candidatoModel.save();
      idCandidato = candidatoModel._id;
    } catch(error) {
      await UsuarioModel.deleteOne({ _id: idUsuario }).exec();
      await CandidatoModel.deleteOne({ _id: idCandidato }).exec();

      throw new DomainException('Erro no cadastro do usuário');
    }

    return this.returnSuccess();
  }
}
