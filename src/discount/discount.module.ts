import { Module } from '@nestjs/common';
import { DiscountController } from './discount.controller';
import { DiscountService } from './discount.service';
import { DiscountModel } from 'src/Schemas/DiscountModel.schema';
import { CategoryOne } from 'src/Schemas/CategoryOne.schema';
import { CategoryTwo } from 'src/Schemas/CategoryTwo.schema';
import { UserModel } from 'src/Schemas/User.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Discount', schema: DiscountModel}, 
      {name: 'User', schema: UserModel}, 
      {name: 'FirstCategory', schema: CategoryOne}, 
      {name: 'SecondCategory', schema: CategoryTwo}
    ])],
  controllers: [DiscountController],
  providers: [DiscountService]
})
export class DiscountModule { }
