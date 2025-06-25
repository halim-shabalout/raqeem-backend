import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrganizationDocument = Organization & Document;

@Schema({ timestamps: true })
export class Organization extends Document {
  @Prop({ required: true, enum: ['company', 'individual'] })
  type: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  subdomain: string;

  @Prop({
    required: true,
    default: 'active',
    enum: ['active', 'suspended', 'deleted'],
  })
  status: string;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
