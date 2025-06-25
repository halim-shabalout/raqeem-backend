import { Module } from '@nestjs/common';
import { OrganizationLogosService } from './organization-logos.service';
import { OrganizationLogosController } from './organization-logos.controller';

@Module({
  controllers: [OrganizationLogosController],
  providers: [OrganizationLogosService],
})
export class OrganizationLogosModule {}
