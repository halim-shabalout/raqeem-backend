import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganizationLogosService } from './organization-logos.service';
import { CreateOrganizationLogoDto } from './dto/create-organization-logo.dto';
import { UpdateOrganizationLogoDto } from './dto/update-organization-logo.dto';

@Controller('organization-logos')
export class OrganizationLogosController {
  constructor(private readonly organizationLogosService: OrganizationLogosService) {}

  @Post()
  create(@Body() createOrganizationLogoDto: CreateOrganizationLogoDto) {
    return this.organizationLogosService.create(createOrganizationLogoDto);
  }

  @Get()
  findAll() {
    return this.organizationLogosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationLogosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizationLogoDto: UpdateOrganizationLogoDto) {
    return this.organizationLogosService.update(+id, updateOrganizationLogoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationLogosService.remove(+id);
  }
}
