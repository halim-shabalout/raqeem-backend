import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export type ProductSubcategoryDocument = ProductSubcategory & Document;

@Schema({ timestamps: true })
export class ProductSubcategory {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    category_id: true,
  })
  organization: mongoose.Types.ObjectId;

  @Prop({ required: true, unique: true })
  name: string;
}

export const ProductSubcategorySchema =
  SchemaFactory.createForClass(ProductSubcategory);
