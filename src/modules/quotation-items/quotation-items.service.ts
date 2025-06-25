import { Injectable } from '@nestjs/common';
import { CreateQuotationItemDto } from './dto/create-quotation-item.dto';
import { UpdateQuotationItemDto } from './dto/update-quotation-item.dto';

@Injectable()
export class QuotationItemsService {
  create(createQuotationItemDto: CreateQuotationItemDto) {
    return 'This action adds a new quotationItem';
  }

  findAll() {
    return `This action returns all quotationItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quotationItem`;
  }

  update(id: number, updateQuotationItemDto: UpdateQuotationItemDto) {
    return `This action updates a #${id} quotationItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} quotationItem`;
  }
}
