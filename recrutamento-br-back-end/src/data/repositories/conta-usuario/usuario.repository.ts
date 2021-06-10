import { model } from 'mongoose';
import { Entities } from '../../../core/data/entities';
import { Usuario } from '../../../domain/conta-usuario/entities/usuario';
import {
  UsuarioDocument,
  usuarioSchema,
} from '../../../data/data-source/mongoose/schemas/conta-usuario/usuario.schema';
import { Injectable } from '@nestjs/common';
import { Repository } from '../repository';
import { RolesApi } from '../../../core/authorizations/roles-api';

@Injectable()
export class UsuarioRepository extends Repository<UsuarioDocument, Usuario> {
  constructor() {
    const usuarioModel = model<UsuarioDocument>(
      Entities.Usuario,
      usuarioSchema,
    );
    super(usuarioModel);
  }

  async cadastrar(usuario: {
    email: string;
    senha: string;
    perfil: RolesApi;
  }): Promise<Usuario> {
    return await this.create({
      email: usuario.email,
      senha: usuario.senha,
      perfil: usuario.perfil.toString(),
    });
  }
}
