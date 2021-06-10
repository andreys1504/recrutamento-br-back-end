import { Injectable } from '@nestjs/common';
import { RolesApi } from '../../../../../core/authorizations/roles-api';
import { AppService } from '../../../../../core/domain/application-services/service/app-service';
import { ResponseServiceModel } from '../../../../../core/domain/application-services/response/response-service';
import { CryptographyHelpers } from '../../../../../core/helpers/cryptography.helpers';
import { AutenticacaoDataResponse } from './autenticacao.data-response';
import { AutenticacaoRequest } from './autenticacao.request';
import { CandidatoRepository } from '../../../../../data/repositories/conta-usuario/candidato.repository';
import { UsuarioRepository } from '../../../../../data/repositories/conta-usuario/usuario.repository';
import { RecrutadorRepository } from '../../../../../data/repositories/conta-usuario/recrutador.repository';

@Injectable()
export class AutenticacaoAppService extends AppService<AutenticacaoDataResponse> {
  constructor(
    private readonly candidatoRepository: CandidatoRepository,
    private readonly usuarioRepository: UsuarioRepository,
    private readonly recrutadorRepository: RecrutadorRepository,
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

    const usuario = await this.usuarioRepository.buscar(
      {
        email: request.email,
        senha: senhaEncriptada,
      },
      'id email perfil',
    );

    let idCandidatoRecrutador = '';
    if (usuario.perfil === RolesApi.Candidato) {
      idCandidatoRecrutador = (
        await this.candidatoRepository.buscar(
          {
            usuarioId: usuario.id,
          },
          'id',
        )
      ).id;
    } else {
      idCandidatoRecrutador = (
        await this.recrutadorRepository.buscar(
          {
            usuarioId: usuario.id,
          },
          'id',
        )
      ).id;
    }

    if (usuario === null) {
      return this.returnNotification('email', 'E-mail e/ou Senha inválido(s)');
    }

    return this.returnData({
      idUsuario: usuario.id,
      idCandidatoRecrutador: idCandidatoRecrutador,
      email: usuario.email,
      permissoes: [usuario.perfil],
    });
  }
}
