import { Injectable } from '@nestjs/common';
import { RolesApi } from '../../../../../core/authorizations/roles-api';
import { AppService } from '../../../../../core/domain/application-services/service/app-service';
import { ResponseAppService } from '../../../../../core/domain/application-services/response/response-app-service';
import { DomainException } from '../../../../../core/domain/exceptions/domain.exception';
import { CryptographyHelpers } from '../../../../../core/helpers/cryptography.helpers';
import { CadastroUsuarioCandidatoRequest } from './cadastro-usuario-candidato.request';
import { CandidatoRepository } from '../../../../../data/repositories/conta-usuario/candidato.repository';
import { UsuarioRepository } from '../../../../../data/repositories/conta-usuario/usuario.repository';

@Injectable()
export class CadastroUsuarioCandidatoAppService extends AppService<boolean> {
  constructor(
    private readonly candidatoRepository: CandidatoRepository,
    private readonly usuarioRepository: UsuarioRepository,
  ) {
    super();
  }

  async handleAsync(
    request: CadastroUsuarioCandidatoRequest,
  ): Promise<ResponseAppService<boolean>> {
    if (request.validate() === false) {
      return this.returnNotifications(request.getNotifications);
    }

    const usuarioPorEmail = await this.usuarioRepository.buscar({
      email: request.email,
    });

    if (usuarioPorEmail) {
      return this.returnNotification('email', 'Usuário existente no sistema');
    }

    let idUsuario: string;
    let idCandidato: string;

    try {
      const usuario = await this.usuarioRepository.cadastrar({
        email: request.email,
        senha: CryptographyHelpers.encryptPassword(request.senha),
        perfil: RolesApi.Candidato,
      });
      idUsuario = usuario.id;

      const candidato = await this.candidatoRepository.cadastrar({
        nome: request.nome,
        ativo: true,
        idUsuario: idUsuario,
      });
      idCandidato = candidato.id;
    } catch(error) {
      await this.usuarioRepository.delete({ id: idUsuario });
      await this.candidatoRepository.delete({ id: idCandidato });

      throw new DomainException('Erro no cadastro do usuário');
    }

    return this.returnSuccess();
  }
}
