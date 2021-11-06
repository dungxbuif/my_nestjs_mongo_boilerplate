import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, mongoose, prop, Severity } from '@typegoose/typegoose';
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
