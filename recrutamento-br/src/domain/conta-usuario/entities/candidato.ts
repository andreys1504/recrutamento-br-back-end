import { Entity } from 'src/core/domain/entities/entity-base/entity';
import { Usuario } from './usuario';

export interface Candidato extends Entity {
  nome: string;
  ativo: boolean;
  usuario: Usuario;
}
