import { RequestService } from 'src/core/domain/application-services/request/request-service';
import { Flunt } from 'src/core/validations/flunt';

export class CadastroUsuarioCandidatoRequest extends RequestService {
  constructor(public email: string, public senha: string, public nome: string) {
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

    if (this.nome) {
      this.nome = this.nome.trim();
    }
    flunt.isNotNullOrEmpty(this.nome, 'senha', 'Informe o Nome');
    flunt.hasMinLen(this.nome, 3, 'nome', 'Nome inválido');
    flunt.hasMaxLen(this.nome, 45, 'nome', 'Nome inválido');

    this.addNotifications(flunt.notifications);

    return this.isValid;
  }
}
