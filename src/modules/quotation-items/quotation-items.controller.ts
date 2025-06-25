import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuotationItemsService } from './quotation-items.service';
import { CreateQuotationItemDto } from './dto/create-quotation-item.dto';
import { UpdateQuotationItemDto } from './dto/update-quotation-item.dto';

@Controller('quotation-items')
export class QuotationItemsController {
  constructor(private readonly quotationItemsService: QuotationItemsService) {}

  @Post()
  create(@Body() createQuotationItemDto: CreateQuotationItemDto) {
    return this.quotationItemsService.create(createQuotationItemDto);
  }

  @Get()
  findAll() {
    return this.quotationItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quotationItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuotationItemDto: UpdateQuotationItemDto) {
    return this.quotationItemsService.update(+id, updateQuotationItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quotationItemsService.remove(+id);
  }
}
