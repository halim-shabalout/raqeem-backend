import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationPlanDto } from './create-organization-plan.dto';

export class UpdateOrganizationPlanDto extends PartialType(CreateOrganizationPlanDto) {}
