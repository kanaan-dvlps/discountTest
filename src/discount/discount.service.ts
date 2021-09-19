import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Joi from 'joi';

@Injectable()
export class DiscountService {
  constructor() { }
  @InjectModel('User') private user: Model<any>;
  @InjectModel('Discount') private discount: Model<any>;
  @InjectModel('Product') private product: Model<any>;
  @InjectModel('FirstCategory') private firstCategory: Model<any>;
  @InjectModel('SecondCategory') private secondCategory: Model<any>;

  async updateCategoryDiscount(data) {
    const { body, id, productCode, price, discountCode, userId, hasDiscount, isDiscountActive, parent,  } = data;

    let errors = {
      statusCode: null,
      message: ''
    };
    let response = {
      statusCode: null,
      message: ''
    };

    const validateSchema = Joi.object().keys({
      body: Joi.string(),
      id: Joi.string(),
      productCode: Joi.string(),
      price: Joi.string(),
      discountCode: Joi.boolean().strict(),
      userId: Joi.string(),
      hasDiscount: Joi.boolean().strict(),
      isDiscountActive: Joi.boolean().strict(),
      parent: Joi.string()
    });

    /*
      * we're checking the opposite amount of every boolean query that we have so we don't have to reverse the conditions and do one step less
      * also if the errors occure there will be a 406 error being sent back
    */
   
    const discountCheck = await this.discount.find({ _id: id, isDiscountActive: { $ne: false } });
    const productDiscount = await this.product.find({ _id: id, hasDiscount: { $ne: true } });
    const mainCategoryDiscount = await this.secondCategory.find({ _id: id, hasDiscount: { $ne: true } });
    const categoryDiscount = await this.firstCategory.find({ _id: id, hasDiscount: { $ne: true } });

    if (validateSchema.validate(body).error !== undefined || null) {
      errors.statusCode = 406;
      errors.message = validateSchema.validate(body).error.message;
      return errors;
    } else if (mainCategoryDiscount.length === 0) {
      errors.statusCode = 406;
      errors.message = `douplicated main category discount`;
      return errors;
    } else if (categoryDiscount.length === 0) {
      errors.statusCode = 406;
      errors.message = `douplicated child category discount`;
      return errors;
    } else if (discountCheck) {
      errors.statusCode = 406;
      errors.message = `discount already used`
    } else if (productDiscount.length === 0) {
      errors.statusCode = 406;
      errors.message = `douplicated product discount`
      return errors;
    } else if (productDiscount || productDiscount === []) {
      if (discountCode) {
        const productDiscountStatusUpdate = await this.discount.findOneAndUpdate(data);
        response.statusCode = 201;
        response.message = productDiscountStatusUpdate;
        return response;
      }
    }
  }

  // * for test
  async addDiscount(data) {
    console.log({ data });
    const newDiscount = await new this.discount(data);
    const result = await newDiscount.save();
    return result;
  }

  // * for test
  async addProduct(data) {
    const newProduct = await new this.product(data);
    const result = await newProduct.save();
    return result;
  }

  // * for test
  async getAll() {
    const result = await this.discount.find();
    return result;
  }
}
