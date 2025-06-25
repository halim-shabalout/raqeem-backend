import { Module } from '@nestjs/common';
import { OrganizationPlansService } from './organization-plans.service';
import { OrganizationPlansController } from './organization-plans.controller';

@Module({
  controllers: [OrganizationPlansController],
  providers: [OrganizationPlansService],
})
export class OrganizationPlansModule {}
