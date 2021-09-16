import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// import * as mongoose from "mongoose";
import { Document, Types } from "mongoose";
import { CategoryTwoDocument, CategoryTwo } from "./CategoryTwo.schema";

export type CategoryOneDocument = CatOne & Document;

@Schema()
export class CatOne {
  @Prop()
  name: string;
  @Prop({ default: false })
  hasDiscount: boolean;
  @Prop({ type: Types.ObjectId, ref: 'CategoryTwo' })
  parent: CategoryTwoDocument;
}

export const CategoryOne = SchemaFactory.createForClass(CatOne);