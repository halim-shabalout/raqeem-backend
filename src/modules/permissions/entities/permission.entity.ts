import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export type PermissionDocument = Permission & Document;

@Schema({ timestamps: true })
export class Permission {
  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Method',
    required: true,
  })
  method: mongoose.Types.ObjectId;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Resource',
    required: true,
  })
  resource: mongoose.Types.ObjectId;

  @Prop({ required: true, unique: true })
  key: string;

  @Prop({ required: true, unique: true })
  label: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
