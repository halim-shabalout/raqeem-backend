import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MethodDocument = Method & Document;

@Schema({ timestamps: true })
export class Method {
  @Prop({ required: true, unique: true })
  key: string;

  @Prop({ required: true, unique: true })
  label: string;
}

export const MethodSchema = SchemaFactory.createForClass(Method);
