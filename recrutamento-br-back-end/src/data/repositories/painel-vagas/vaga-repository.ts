import { Injectable } from '@nestjs/common';
import { model } from 'mongoose';
import { Entities } from '../../../core/data/entities';
import {
  VagaDocument,
  vagaSchema,
} from '../../../data/data-source/mongoose/schemas/painel-vagas/vaga.schema';
import { Vaga } from '../../../domain/painel-vagas/entities/vaga';
import { Repository } from '../repository';

@Injectable()
export class VagaRepository extends Repository<VagaDocument, Vaga> {
  constructor() {
    const vagaModel = model<VagaDocument>(Entities.Vaga, vagaSchema);
    super(vagaModel);
  }

  async cadastrar(vaga: {
    titulo: string;
    descricao: string;
    tags: string[];
    idRecrutador: string;
  }): Promise<Vaga> {
    return await this.create({
      titulo: vaga.titulo,
      descricao: vaga.descricao,
      tags: vaga.tags,
      recrutadorId: vaga.idRecrutador,
      recrutador: vaga.idRecrutador,
    });
  }

  async atualizar(
    idVaga: string,
    idRecrutador: string,
    dados: {
      titulo: string;
      descricao: string;
      tags: string[];
    },
  ): Promise<Vaga> {
    return await this.findOneAndUpdate(
      { id: idVaga, recrutadorId: idRecrutador },
      {
        titulo: dados.titulo,
        descricao: dados.descricao,
        tags: dados.tags,
      },
    );
  }
}
