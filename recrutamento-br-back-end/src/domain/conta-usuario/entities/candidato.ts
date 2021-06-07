import { IAggregateRoot } from 'src/core/domain/entities/aggregate-root';
import { Usuario } from './usuario';

export interface Candidato extends IAggregateRoot {
  nome: string;
  ativo: boolean;
  usuario: Usuario;
}
