import { RequestService } from '../../../../../core/domain/application-services/request/request-service';
import { Flunt } from '../../../../../core/validations/flunt';

export class AutenticacaoRequest extends RequestService {
  constructor(public email: string, public senha: string) {
    super();
  }

  validate(): boolean {
    const flunt = new Flunt();

    if (this.email) {
      this.email = this.email.trim();
    }
    flunt.isNotNullOrEmpty(this.email, 'email', 'Informe o E-mail');
    flunt.isEmail(this.email, 'email', 'E-mail inválido');
    flunt.hasMaxLen(this.email, 45, 'email', 'E-mail inválido');

    if (this.senha) {
      this.senha = this.senha.trim();
    }
    flunt.isNotNullOrEmpty(this.senha, 'senha', 'Informe a Senha');
    flunt.hasMinLen(this.senha, 8, 'senha', 'Senha inválida');
    flunt.hasMaxLen(this.senha, 20, 'senha', 'Senha inválida');

    this.addNotifications(flunt.notifications);

    return this.isValid;
  }
}
