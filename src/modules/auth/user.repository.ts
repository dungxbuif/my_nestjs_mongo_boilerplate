import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from './../base/base.repository';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserRepository extends BaseRepository<User, UserDocument> {
  constructor(@InjectModel(User.name) model) {
    super(model, model);
  }
}
