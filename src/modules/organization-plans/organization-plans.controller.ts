import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganizationPlansService } from './organization-plans.service';
import { CreateOrganizationPlanDto } from './dto/create-organization-plan.dto';
import { UpdateOrganizationPlanDto } from './dto/update-organization-plan.dto';

@Controller('organization-plans')
export class OrganizationPlansController {
  constructor(private readonly organizationPlansService: OrganizationPlansService) {}

  @Post()
  create(@Body() createOrganizationPlanDto: CreateOrganizationPlanDto) {
    return this.organizationPlansService.create(createOrganizationPlanDto);
  }

  @Get()
  findAll() {
    return this.organizationPlansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationPlansService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganizationPlanDto: UpdateOrganizationPlanDto) {
    return this.organizationPlansService.update(+id, updateOrganizationPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationPlansService.remove(+id);
  }
}
