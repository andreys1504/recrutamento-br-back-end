import { RequestService } from 'src/core/domain/application-services/request/request-service';
import { DomainException } from 'src/core/domain/exceptions/domain.exception';
import { Flunt } from 'src/core/validations/flunt';

export class CadastroVagaRequest extends RequestService {
  constructor(
    public titulo: string,
    public descricao: string,
    public tags: string[],
    public idRecrutador: string
  ) {
    super();
  }

  validate(): boolean {
    const flunt = new Flunt();

    if(!this.idRecrutador) {
      throw new DomainException("Erro no cadastro da vaga");
    }

    if (this.titulo) {
      this.titulo = this.titulo.trim();
    }
    flunt.isNotNullOrEmpty(this.titulo, 'titulo', 'informe o Título');
    flunt.hasMinLen(this.titulo, 5, 'titulo', 'Titulo inválido');
    flunt.hasMaxLen(
      this.titulo,
      45,
      'titulo',
      'Título inválido; máximo 45 caracteres',
    );

    if (this.descricao) {
      this.descricao = this.descricao.trim();
    }
    flunt.isNotNullOrEmpty(this.descricao, 'descricao', 'informe a Descrição');
    flunt.hasMinLen(this.descricao, 8, 'descricao', 'Descrição muita curta');
    flunt.hasMaxLen(this.descricao, 8000, 'senha', 'Descrição inválida');

    flunt.isNotNull(this.tags, 'tags', 'Informe as Tags');
    flunt.hasMinLen(this.tags?.length, 1, 'tags', 'informe as Tags');
    flunt.hasMaxLen(this.tags?.length, 30, 'tags', 'informe no máximo 30 tags');

    if (flunt.isValid) {
      const quantidadeTags = this.tags.length;
      const tagsFinal = [];
      for (var index = 0; index < quantidadeTags; index++) {
        if (this.tags[index]) {
          this.tags[index] = this.tags[index].trim();
        }
        flunt.isNotNullOrEmpty(
          this.tags[index],
          'tags',
          'existem Tags inválidas',
        );
        flunt.hasMaxLen(
          this.tags[index],
          10,
          'tags',
          'existem Tags com mais de 10 caracteres',
        );

        if (flunt.notifications.length > 0) {
          break;
        }

        tagsFinal.push(this.tags[index]);
      }

      this.tags = tagsFinal;
    }

    this.addNotifications(flunt.notifications);

    return this.isValid;
  }
}
