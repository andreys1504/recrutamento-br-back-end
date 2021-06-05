import { Injectable } from '@nestjs/common';
import { RolesApi } from 'src/core/authorizations/roles-api';
import { AppService } from 'src/core/domain/application-services/service/app-service';
import { ResponseServiceModel } from 'src/core/domain/application-services/response/response-service';
import { CryptographyHelpers } from 'src/core/helpers/cryptography.helpers';
import { CandidatoModel } from 'src/data/data-source/mongoose/schemas/conta-usuario/candidato.schema';
import { RecrutadorModel } from 'src/data/data-source/mongoose/schemas/conta-usuario/recrutador.schema';
import { UsuarioModel } from 'src/data/data-source/mongoose/schemas/conta-usuario/usuario.schema';
import { AutenticacaoDataResponse } from './autenticacao.data-response';
import { AutenticacaoRequest } from './autenticacao.request';

@Injectable()
export class AutenticacaoAppService extends AppService<AutenticacaoDataResponse> {
  async handleAsync(
    request: AutenticacaoRequest,
  ): Promise<ResponseServiceModel<AutenticacaoDataResponse>> {
    if (request.validate() === false)
      return this.returnNotifications(request.notifications);

    const senhaEncriptada = CryptographyHelpers.encryptPassword(request.senha);

    const usuario = await UsuarioModel
      .findOne({ 
        email: request.email, 
        senha: senhaEncriptada 
      }, '_id email perfil')
      .exec();

    let idCandidatoRecrutador = '';
    if(usuario.perfil === RolesApi.Candidato) {
      idCandidatoRecrutador = 
        (await CandidatoModel
          .findOne({ 
            usuario: usuario._id 
          }, '_id')
          .exec()
        )
        ._id;
    }
    else {
      idCandidatoRecrutador = 
        (await RecrutadorModel
          .findOne({ 
            usuario: usuario._id 
          }, '_id')
          .exec()
        )
        ._id;
    }

    if (usuario === null)
      return this.returnNotification('email', 'E-mail e/ou Senha inválido(s)');

    return this.returnData({
      idUsuario: usuario._id,
      idCandidatoRecrutador: idCandidatoRecrutador,
      email: usuario.email,
      permissoes: [usuario.perfil],
    });
  }
}
