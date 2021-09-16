import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
export type UserDocument = User & mongoose.Document;

@Schema()
export class User {
  @Prop()
  discountCode: string;
  @Prop()
  username: string;
}

export const UserModel = SchemaFactory.createForClass(User);