import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanFeaturesService } from './plan-features.service';
import { CreatePlanFeatureDto } from './dto/create-plan-feature.dto';
import { UpdatePlanFeatureDto } from './dto/update-plan-feature.dto';

@Controller('plan-features')
export class PlanFeaturesController {
  constructor(private readonly planFeaturesService: PlanFeaturesService) {}

  @Post()
  create(@Body() createPlanFeatureDto: CreatePlanFeatureDto) {
    return this.planFeaturesService.create(createPlanFeatureDto);
  }

  @Get()
  findAll() {
    return this.planFeaturesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planFeaturesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanFeatureDto: UpdatePlanFeatureDto) {
    return this.planFeaturesService.update(+id, updatePlanFeatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planFeaturesService.remove(+id);
  }
}
