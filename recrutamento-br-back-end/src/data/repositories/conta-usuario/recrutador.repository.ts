import { model } from 'mongoose';
import { Recrutador } from '../../../domain/conta-usuario/entities/recrutador';
import {
  RecrutadorDocument,
  recrutadorSchema,
} from '../../../data/data-source/mongoose/schemas/conta-usuario/recrutador.schema';
import { Injectable } from '@nestjs/common';
import { Entities } from '../../../core/data/entities';
import { Repository } from '../repository';

@Injectable()
export class RecrutadorRepository extends Repository<
  RecrutadorDocument,
  Recrutador
> {
  constructor() {
    const recrutadorModel = model<RecrutadorDocument>(
      Entities.Recrutador,
      recrutadorSchema,
    );
    super(recrutadorModel);
  }

  async cadastrar(recrutador: {
    nome: string;
    ativo: boolean;
    idUsuario: string;
  }): Promise<Recrutador> {
    return await this.create({
      nome: recrutador.nome,
      ativo: recrutador.ativo,
      usuarioId: recrutador.idUsuario,
      usuario: recrutador.idUsuario,
    });
  }
}
