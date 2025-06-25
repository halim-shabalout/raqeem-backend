import { Module } from '@nestjs/common';
import { QuotationItemsService } from './quotation-items.service';
import { QuotationItemsController } from './quotation-items.controller';

@Module({
  controllers: [QuotationItemsController],
  providers: [QuotationItemsService],
})
export class QuotationItemsModule {}
