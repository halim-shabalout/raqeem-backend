import { Module } from '@nestjs/common';
import { PlanFeaturesService } from './plan-features.service';
import { PlanFeaturesController } from './plan-features.controller';

@Module({
  controllers: [PlanFeaturesController],
  providers: [PlanFeaturesService],
})
export class PlanFeaturesModule {}
