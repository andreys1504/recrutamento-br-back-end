import { IAggregateRoot } from 'src/core/domain/entities/aggregate-root';

export interface Usuario extends IAggregateRoot {
  email: string;
  senha: string;
  perfil: string;
}
