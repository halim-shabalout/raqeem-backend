import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductSubcategoriesService } from './product-subcategories.service';
import { CreateProductSubcategoryDto } from './dto/create-product-subcategory.dto';
import { UpdateProductSubcategoryDto } from './dto/update-product-subcategory.dto';

@Controller('product-subcategories')
export class ProductSubcategoriesController {
  constructor(private readonly productSubcategoriesService: ProductSubcategoriesService) {}

  @Post()
  create(@Body() createProductSubcategoryDto: CreateProductSubcategoryDto) {
    return this.productSubcategoriesService.create(createProductSubcategoryDto);
  }

  @Get()
  findAll() {
    return this.productSubcategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productSubcategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductSubcategoryDto: UpdateProductSubcategoryDto) {
    return this.productSubcategoriesService.update(+id, updateProductSubcategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productSubcategoriesService.remove(+id);
  }
}
