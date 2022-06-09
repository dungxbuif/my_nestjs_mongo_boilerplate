// import { NotFound } from '../../exceptions/not-found.exception';
import { DocumentType } from '@typegoose/typegoose';
import { AnyKeys, Document, FilterQuery } from 'mongoose';
import { ModelType } from 'typegoose';
// import { NOT_FOUND } from '../constant/error-message';

export class BaseRepository<T> {
   constructor(private readonly model: ModelType<T>) {}

   public async findOneById(_id: string): Promise<T & Document> {
      return await this.model.findById(_id).lean();
   }

   public async findOne(opts: FilterQuery<DocumentType<T>> = {}): Promise<T> {
      return await this.model.findOne(opts).lean();
   }

   public async findAll(opts: FilterQuery<DocumentType<T>> = {}): Promise<T[]> {
      return await this.model.find(opts).lean();
   }

   async findByIdAndUpdate(id: string, update: any = {}, isNew = true): Promise<T> {
      return await this.model.findByIdAndUpdate(id, update, {
         useFindAndModify: false,
         new: isNew,
      });
   }

   async findOneAndUpdate(
      filter: FilterQuery<DocumentType<T>>,
      update: any = {},
      isNew = true,
   ): Promise<T & Document> {
      return await this.model.findOneAndUpdate(filter, update, {
         upsert: true,
         useFindAndModify: false,
         new: isNew,
      });
   }

   public async deleteById(_id: string): Promise<boolean> {
      const res = await this.model.findByIdAndDelete(_id);
      if (!res) {
         // throw new NotFound(NOT_FOUND);
      }
      return true;
   }

   public async count(opts: FilterQuery<DocumentType<T>> = {}): Promise<number> {
      return await this.model.countDocuments(opts);
   }

   async insertMany(dtos: AnyKeys<DocumentType<T>>[]): Promise<T[]> {
      const news = dtos.map((dto) => new this.model(dto));
      return await this.model.insertMany(news);
   }

   public async deleteMany(opts: FilterQuery<DocumentType<T>> = {}): Promise<void> {
      await this.model.deleteMany(opts);
   }

   public async createOne(opts: Partial<T>): Promise<T> {
      const createdModel = await this.model.create(opts);
      return createdModel.toObject<T>();
   }
}

//---------------------------- With @nestjs/mongoose-------------------------------\\
// import EventEmitter from 'events';
// import {
//   Aggregate,
//   AnyKeys,
//   AnyObject,
//   Document,
//   FilterQuery,
//   Model,
//   UpdateQuery,
// } from 'mongoose';
// import { BaseSchema } from './base.schema';
// export class BaseRepository<
//   Schema extends BaseSchema,
//   T extends Document,
// > extends EventEmitter {
//   protected primaryKey = '_id';

//   constructor(
//     protected readonly model: Model<T>,
//     protected readonly aggModel?: Aggregate<any>,
//   ) {
//     super();
//     this.model = model;
//     this.aggModel = aggModel;
//   }

//   async create(entity: AnyKeys<Schema> & AnyObject): Promise<T> {
//     return new this.model(entity).save();
//   }

//   async createOrUpdate(entity: UpdateQuery<Schema>): Promise<T> {
//     let model = await this.model.findByIdAndUpdate(entity._id, entity);
//     if (!model) model = await new this.model(entity).save();
//     return model;
//   }

//   async findAndUpdate(
//     filer: FilterQuery<T>,
//     update: UpdateQuery<T>,
//   ): Promise<T> {
//     return this.model.findByIdAndUpdate();
//   }
// }