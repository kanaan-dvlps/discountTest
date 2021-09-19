import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { CategoryOneDocument, CategoryOne } from './CategoryOne.schema';

export type ProductDocument = Product & Document;

// * built up on mongoose.Schema()
@Schema()
export class Product {
  @Prop()
  name: string;
  @Prop({ type: Types.ObjectId, ref: 'CategoryOne' })
  parent: CategoryOneDocument;
  @Prop({ default: false })
  hasDiscount: boolean;
  @Prop({ default: false })
  isDiscountActive: boolean;
}

// * this one is built up on mongoose.model() function
export const ProductModel = SchemaFactory.createForClass(Product);