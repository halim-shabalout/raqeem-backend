import { Injectable } from '@nestjs/common';
import { CreateProductSubcategoryDto } from './dto/create-product-subcategory.dto';
import { UpdateProductSubcategoryDto } from './dto/update-product-subcategory.dto';

@Injectable()
export class ProductSubcategoriesService {
  create(createProductSubcategoryDto: CreateProductSubcategoryDto) {
    return 'This action adds a new productSubcategory';
  }

  findAll() {
    return `This action returns all productSubcategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productSubcategory`;
  }

  update(id: number, updateProductSubcategoryDto: UpdateProductSubcategoryDto) {
    return `This action updates a #${id} productSubcategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} productSubcategory`;
  }
}
