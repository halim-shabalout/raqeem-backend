import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export type ProductCategoryDocument = ProductCategory & Document;

@Schema({ timestamps: true })
export class ProductCategory {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  })
  organization: mongoose.Types.ObjectId;

  @Prop({ required: true, unique: true })
  name: string;
}

export const ProductCategorySchema =
  SchemaFactory.createForClass(ProductCategory);
