import { Module } from '@nestjs/common';
import { ProductSubcategoriesService } from './product-subcategories.service';
import { ProductSubcategoriesController } from './product-subcategories.controller';

@Module({
  controllers: [ProductSubcategoriesController],
  providers: [ProductSubcategoriesService],
})
export class ProductSubcategoriesModule {}
