import { Injectable } from '@nestjs/common';
import { CreateOrganizationPlanDto } from './dto/create-organization-plan.dto';
import { UpdateOrganizationPlanDto } from './dto/update-organization-plan.dto';

@Injectable()
export class OrganizationPlansService {
  create(createOrganizationPlanDto: CreateOrganizationPlanDto) {
    return 'This action adds a new organizationPlan';
  }

  findAll() {
    return `This action returns all organizationPlans`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizationPlan`;
  }

  update(id: number, updateOrganizationPlanDto: UpdateOrganizationPlanDto) {
    return `This action updates a #${id} organizationPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizationPlan`;
  }
}
