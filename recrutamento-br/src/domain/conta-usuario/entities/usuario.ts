import { Entity } from 'src/core/domain/entities/entity-base/entity';

export interface Usuario extends Entity {
  email: string;
  senha: string;
  perfil: string;
}
