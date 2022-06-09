import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { BaseSchema } from '../base/base.schema';

@Schema({ timestamps: true })
export class User extends BaseSchema {
  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: String })
  password: string;
}

export type UserDocument = User & Document;
const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(mongoosePaginate);
UserSchema.pre<UserDocument>('save', async function (next) {
  if (this.password && this.isModified('password')) {
    //this.password = new  hasedPassword
  }
});
