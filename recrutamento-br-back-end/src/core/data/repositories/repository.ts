import { Document, FilterQuery, PopulateOptions } from 'mongoose';
import { IAggregateRoot } from '../../domain/entities/aggregate-root';

export interface IRepository<
  TDocument extends Document,
  TAggregateRoot extends IAggregateRoot,
> {
  buscar(
    entityFilterQuery: FilterQuery<TDocument>,
    select?: string,
    populate?: PopulateOptions | Array<PopulateOptions>,
  ): Promise<TAggregateRoot | null>;

  buscarColecao(
    entityFilterQuery: FilterQuery<TDocument>,
    select?: string,
    populate?: PopulateOptions | Array<PopulateOptions>,
  ): Promise<TAggregateRoot[] | null>;

  delete(entityFilterQuery: FilterQuery<TDocument>): Promise<boolean>;
}
