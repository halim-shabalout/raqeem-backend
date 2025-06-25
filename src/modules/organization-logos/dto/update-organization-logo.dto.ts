import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationLogoDto } from './create-organization-logo.dto';

export class UpdateOrganizationLogoDto extends PartialType(CreateOrganizationLogoDto) {}
