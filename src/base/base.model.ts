import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop, Severity } from '@typegoose/typegoose';
import { Document } from 'mongoose';

@modelOptions({
   options: { allowMixed: Severity.ALLOW },
   schemaOptions: {
      timestamps: true,
      minimize: true,
      optimisticConcurrency: true,
      toJSON: {
         virtuals: true,
         getters: true,
      },
      toObject: {
         virtuals: true,
         getters: true,
      },
   },
})
export class BaseModel extends Document {
   @ApiProperty()
   @prop()
   createdAt: Date;

   @ApiProperty()
   @prop()
   updatedAt: Date;
}

//---------------------------- With @nestjs/mongoose-------------------------------\\
// import { Prop, Schema } from '@nestjs/mongoose';
// import { Types } from 'mongoose';

// @Schema()
// export class BaseSchema {
//   @Prop()
//   _id?: string;
//   @Prop()
//   created_at?: Date;
//   @Prop()
//   updated_at?: Date;
//   @Prop()
//   __v?: string;
// }

// export type IObjectId = Types.ObjectId | string;
