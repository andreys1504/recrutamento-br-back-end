import { RequestAppService } from '../../../../../core/domain/application-services/request/request-app-service';
import { DomainException } from '../../../../../core/domain/exceptions/domain.exception';
import { Flunt } from '../../../../../core/validations/flunt';

export class CadastroVagaRequest extends RequestAppService {
  constructor(public requestModel: {
    titulo: string,
    descricao: string,
    tags: string[],
    idRecrutador: string
  }) {
    super();
  }

  validate(): boolean {
    const flunt = new Flunt();

    if(!this.requestModel.idRecrutador) {
      throw new DomainException("Erro no cadastro da vaga");
    }

    if (this.requestModel.titulo) {
      this.requestModel.titulo = this.requestModel.titulo.trim();
    }
    flunt.isNotNullOrEmpty(this.requestModel.titulo, 'titulo', 'informe o Título');
    flunt.hasMinLen(this.requestModel.titulo, 5, 'titulo', 'Titulo inválido');
    flunt.hasMaxLen(
      this.requestModel.titulo,
      45,
      'titulo',
      'Título inválido; máximo 45 caracteres',
    );

    if (this.requestModel.descricao) {
      this.requestModel.descricao = this.requestModel.descricao.trim();
    }
    flunt.isNotNullOrEmpty(this.requestModel.descricao, 'descricao', 'informe a Descrição');
    flunt.hasMinLen(this.requestModel.descricao, 8, 'descricao', 'Descrição muita curta');
    flunt.hasMaxLen(this.requestModel.descricao, 8000, 'senha', 'Descrição inválida');

    flunt.isNotNull(this.requestModel.tags, 'tags', 'Informe as Tags');
    flunt.hasMinLen(this.requestModel.tags?.length, 1, 'tags', 'informe as Tags');
    flunt.hasMaxLen(this.requestModel.tags?.length, 30, 'tags', 'informe no máximo 30 tags');

    if (flunt.isValid) {
      const quantidadeTags = this.requestModel.tags.length;
      const tagsFinal = [];
      for (var index = 0; index < quantidadeTags; index++) {
        if (this.requestModel.tags[index]) {
          this.requestModel.tags[index] = this.requestModel.tags[index].trim();
        }
        flunt.isNotNullOrEmpty(
          this.requestModel.tags[index],
          'tags',
          'existem Tags inválidas',
        );
        flunt.hasMaxLen(
          this.requestModel.tags[index],
          10,
          'tags',
          'existem Tags com mais de 10 caracteres',
        );

        if (flunt.notifications.length > 0) {
          break;
        }

        tagsFinal.push(this.requestModel.tags[index]);
      }

      this.requestModel.tags = tagsFinal;
    }

    this.addNotifications(flunt.notifications);

    return this.isValid;
  }
}
