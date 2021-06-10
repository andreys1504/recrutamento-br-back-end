import { IAggregateRoot } from '../../../core/domain/entities/aggregate-root';

export interface Usuario extends IAggregateRoot {
  email: string;
  senha: string;
  perfil: string;
}
