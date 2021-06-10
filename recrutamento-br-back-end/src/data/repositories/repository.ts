import {
  Document,
  FilterQuery,
  Model,
  PopulateOptions,
  UpdateQuery,
} from 'mongoose';
import { IRepository } from '../../core/data/repositories/repository';
import { IAggregateRoot } from '../../core/domain/entities/aggregate-root';

export abstract class Repository<
  TDocument extends Document,
  TAggregateRoot extends IAggregateRoot,
> implements IRepository<TDocument, TAggregateRoot>
{
  constructor(protected readonly entityModel: Model<TDocument>) {}

  async buscar(
    entityFilterQuery?: FilterQuery<TDocument>,
    select?: string,
    populate?: PopulateOptions | Array<PopulateOptions>,
  ): Promise<TAggregateRoot | null> {
    return (
      await this.entityModel
        .findOne(entityFilterQuery, select)
        .populate(populate)
        .exec()
    )?.toObject<TAggregateRoot>();
  }

  async buscarColecao(
    entityFilterQuery: FilterQuery<TDocument>,
    select?: string,
    populate?: PopulateOptions | Array<PopulateOptions>,
  ): Promise<TAggregateRoot[] | null> {
    return (
      await this.entityModel
        .find(entityFilterQuery, select)
        .populate(populate)
        .exec()
    ).map((entity) => entity?.toObject<TAggregateRoot>());
  }

  protected async create(createEntityData: unknown): Promise<TAggregateRoot> {
    const entity = new this.entityModel(createEntityData);
    await entity.save();

    return entity.toObject<TAggregateRoot>();
  }

  protected async findOneAndUpdate(
    entityFilterQuery: FilterQuery<TDocument>,
    updateEntityData: UpdateQuery<unknown>,
    populate?: PopulateOptions | Array<PopulateOptions>,
  ): Promise<TAggregateRoot | null> {
    return (
      await this.entityModel
        .findOneAndUpdate(this.replace_IdProperty(entityFilterQuery), updateEntityData, {
          new: true,
        })
        .populate(populate)
        .exec()
    )?.toObject<TAggregateRoot>();
  }

  async delete(entityFilterQuery: FilterQuery<TDocument>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(this.replace_IdProperty(entityFilterQuery));
    return deleteResult.deletedCount >= 1;
  }

  
  private replace_IdProperty(entityFilterQuery: FilterQuery<TDocument>) {
    if (entityFilterQuery?.id) {
      entityFilterQuery._id = entityFilterQuery.id;
      delete entityFilterQuery.id;
    }

    return entityFilterQuery;
  }
}
