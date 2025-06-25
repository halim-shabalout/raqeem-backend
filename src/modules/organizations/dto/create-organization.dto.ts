import { IsString, IsIn, IsNotEmpty } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  @IsIn(['company', 'individual'])
  type: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  subdomain: string;

  @IsString()
  @IsIn(['active', 'suspended', 'deleted'])
  status: string;
}
