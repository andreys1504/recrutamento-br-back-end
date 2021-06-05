import { Document } from "mongoose";

export type EntityToDocument<TEntity> = Omit<TEntity, "id"> & Document;