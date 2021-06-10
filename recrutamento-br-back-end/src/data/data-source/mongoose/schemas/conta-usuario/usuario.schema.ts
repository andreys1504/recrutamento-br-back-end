import { Schema } from 'mongoose';
import { Usuario } from '../../../../../domain/conta-usuario/entities/usuario';
import { schemaOptions } from '../../../../../data/data-source/mongoose/schema-options';
import { EntityToDocument } from '../../entity-to-document';

export type UsuarioDocument = EntityToDocument<Usuario>;

export const usuarioSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      index: {
        unique: true,
      },
    },
    senha: {
      type: String,
      trim: true,
    },
    perfil: {
      type: String,
      trim: true,
    },
  },
  {
    ...schemaOptions,
    collection: 'usuarios',
  },
);
