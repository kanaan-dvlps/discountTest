import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DiscountService } from './discount.service';

@Controller('discount')
export class DiscountController {
  constructor(private readonly service: DiscountService) { }

  @Post('/add/product/:id/mainCategory/:id/secondaryCategory/:id')
  updateCategoryDiscount(@Body() Body, @Param('id') productId: string, @Param('id') mainCatId: string, @Param('id') secondCatId: string) {
    console.log({Body});
    return this.service.updateCategoryDiscount({Body, productId, mainCatId, secondCatId});
  }

  @Get('/all')
  getAll() {
    return this.service.getAll();
  }
}