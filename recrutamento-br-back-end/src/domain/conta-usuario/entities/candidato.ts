import { IAggregateRoot } from '../../../core/domain/entities/aggregate-root';
import { Usuario } from './usuario';

export interface Candidato extends IAggregateRoot {
  nome: string;
  ativo: boolean;
  usuarioId: string;
  usuario: Usuario;
}
