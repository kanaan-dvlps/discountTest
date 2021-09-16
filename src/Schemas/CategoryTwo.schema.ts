import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// import * as mongoose from "mongoose";
import { Document } from "mongoose";

export type CategoryTwoDocument = CatTwo & Document;

@Schema()
export class CatTwo {
  @Prop()
  name: string;
  @Prop({ default: false })
  hasDiscount: boolean;
}

export const CategoryTwo = SchemaFactory.createForClass(CatTwo);