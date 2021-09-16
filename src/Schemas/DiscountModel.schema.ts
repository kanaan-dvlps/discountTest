import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// import * as mongoose from "mongoose";
import { Document, Types } from "mongoose";
import { CategoryOneDocument, CategoryOne } from "./CategoryOne.schema";
import { UserDocument, UserModel } from "./User.schema";
export type DiscountDocument = Discount & Document;

@Schema()
export class Discount {
  @Prop()
  productCode: string;
  @Prop()
  price: string;
  @Prop()
  discountCode: string;
  @Prop({ type: Types.ObjectId, ref: 'UserModel' })
  userId: UserDocument;
  @Prop({ default: false })
  hasDiscount: boolean;
  @Prop({ default: false })
  isDiscountActive: boolean;
  @Prop({ type: Types.ObjectId, ref: 'CategoryOne' })
  parent: CategoryOneDocument;
}

export const DiscountModel = SchemaFactory.createForClass(Discount);