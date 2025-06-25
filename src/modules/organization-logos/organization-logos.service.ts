import { Injectable } from '@nestjs/common';
import { CreateOrganizationLogoDto } from './dto/create-organization-logo.dto';
import { UpdateOrganizationLogoDto } from './dto/update-organization-logo.dto';

@Injectable()
export class OrganizationLogosService {
  create(createOrganizationLogoDto: CreateOrganizationLogoDto) {
    return 'This action adds a new organizationLogo';
  }

  findAll() {
    return `This action returns all organizationLogos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizationLogo`;
  }

  update(id: number, updateOrganizationLogoDto: UpdateOrganizationLogoDto) {
    return `This action updates a #${id} organizationLogo`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizationLogo`;
  }
}
