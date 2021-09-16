import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DiscountService {
  constructor() { }
  @InjectModel('User') private user: Model<any>;
  @InjectModel('Discount') private discount: Model<any>;
  @InjectModel('FirstCategory') private firstCategory: Model<any>;
  @InjectModel('SecondCategory') private secondCategory: Model<any>;

  async updateCategoryDiscount(data) {
    const { body, id, productCode, price, discountCode, userId, hasDiscount, isDiscountActive, parent } = data;

    let errors = {
      statusCode: null,
      message: ''
    };
    
    const productDiscount = await this.discount.find({ _id: id, hasDiscount: { $ne: true }}); 
    const mainCategoryDiscount = await this.secondCategory.find({ _id: id, hasDiscount: { $ne: true }});
    const categoryDiscount = await this.firstCategory.find({ _id: id, hasDiscount: { $ne: true }});

    if (mainCategoryDiscount.length === 0) {
    errors.statusCode = 406;
    errors.message = `douplicated main category discount`;
    return errors;
    } else if (categoryDiscount.length === 0) {
    errors.statusCode = 406;
    errors.message = `douplicated child category discount`;
    return errors;
    } else if (productDiscount.length === 0) {
      errors.statusCode = 406;
      errors.message = `douplicated product discount`
      return errors;
    } else if (productDiscount || productDiscount === []) {
      const productDiscountStatusUpdate = await this.discount.findOneAndUpdate(data);
      return productDiscountStatusUpdate;
    }
  }

  async addDiscount(data) {
    console.log({ data });
    const newDiscount = await new this.discount(data);
    const result = await newDiscount.save();
    return result;
  }

  async getAll() {
    const result = await this.discount.find();
    return result;
  }
}
