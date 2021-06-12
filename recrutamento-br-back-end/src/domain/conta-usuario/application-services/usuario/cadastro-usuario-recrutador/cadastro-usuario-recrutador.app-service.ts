import { Injectable } from '@nestjs/common';
import { RolesApi } from '../../../../../core/authorizations/roles-api';
import { AppService } from '../../../../../core/domain/application-services/service/app-service';
import { ResponseAppService } from '../../../../../core/domain/application-services/response/response-app-service';
import { DomainException } from '../../../../../core/domain/exceptions/domain.exception';
import { CryptographyHelpers } from '../../../../../core/helpers/cryptography.helpers';
import { CadastroUsuarioRecrutadorRequest } from './cadastro-usuario-recrutador.request';
import { UsuarioRepository } from '../../../../../data/repositories/conta-usuario/usuario.repository';
import { RecrutadorRepository } from '../../../../../data/repositories/conta-usuario/recrutador.repository';

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
    let idRecrutador: string;

    try {
      const usuario = await this.usuarioRepository.cadastrar({
        email: request.email,
        senha: CryptographyHelpers.encryptPassword(request.senha),
        perfil: RolesApi.Recrutador,
      });
      idUsuario = usuario.id;

      const recrutador = await this.recrutadorRepository.cadastrar({
        nome: request.nome,
        ativo: true,
        idUsuario: idUsuario,
      });
      idRecrutador = recrutador.id;
    } catch {
      await this.usuarioRepository.delete({ id: idUsuario });
      await this.recrutadorRepository.delete({ id: idRecrutador });

      throw new DomainException('Erro no cadastro do usuário');
    }

    return this.returnSuccess();
  }
}
