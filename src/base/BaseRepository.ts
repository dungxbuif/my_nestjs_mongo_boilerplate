// import { NotFound } from '../../exceptions/not-found.exception';
import { DocumentType } from '@typegoose/typegoose';
import { AnyKeys, Document, FilterQuery, LeanDocument } from 'mongoose';
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
