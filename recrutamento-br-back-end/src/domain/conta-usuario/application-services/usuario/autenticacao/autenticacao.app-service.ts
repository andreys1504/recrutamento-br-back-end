import { Injectable } from '@nestjs/common';
import { RolesApi } from 'src/core/authorizations/roles-api';
import { AppService } from 'src/core/domain/application-services/service/app-service';
import { ResponseServiceModel } from 'src/core/domain/application-services/response/response-service';
import { CryptographyHelpers } from 'src/core/helpers/cryptography.helpers';
import { AutenticacaoDataResponse } from './autenticacao.data-response';
import { AutenticacaoRequest } from './autenticacao.request';
import { CandidatoRepository } from 'src/data/repositories/conta-usuario/candidato.repository';
import { UsuarioRepository } from 'src/data/repositories/conta-usuario/usuario.repository';
import { RecrutadorRepository } from 'src/data/repositories/conta-usuario/recrutador.repository';

@Injectable()
export class AutenticacaoAppService extends AppService<AutenticacaoDataResponse> {
  constructor(
    private readonly candidatoRepository: CandidatoRepository,
    private readonly usuarioRepository: UsuarioRepository,
    private readonly recrutadorRepository: RecrutadorRepository
  ) {
    super();
  }

  async handleAsync(
    request: AutenticacaoRequest,
  ): Promise<ResponseServiceModel<AutenticacaoDataResponse>> {
    if (request.validate() === false) {
      return this.returnNotifications(request.notifications);
    }

    const senhaEncriptada = CryptographyHelpers.encryptPassword(request.senha);

    const usuario = await this.usuarioRepository.model
      .findOne({ 
        email: request.email, 
        senha: senhaEncriptada 
      }, '_id email perfil')
      .exec();

    let idCandidatoRecrutador = '';
    if(usuario.perfil === RolesApi.Candidato) {
      idCandidatoRecrutador = 
        (await this.candidatoRepository.model
          .findOne({ 
            usuario: usuario._id 
          }, '_id')
          .exec()
        )
        ._id;
    }
    else {
      idCandidatoRecrutador = 
        (await this.recrutadorRepository.model
          .findOne({ 
            usuario: usuario._id 
          }, '_id')
          .exec()
        )
        ._id;
    }

    if (usuario === null) {
      return this.returnNotification('email', 'E-mail e/ou Senha inválido(s)');
    }

    return this.returnData({
      idUsuario: usuario._id,
      idCandidatoRecrutador: idCandidatoRecrutador,
      email: usuario.email,
      permissoes: [usuario.perfil],
    });
  }
}
