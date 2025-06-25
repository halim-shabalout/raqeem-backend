import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';

export class CreateOrganizationWithOwnerDto {
  // Organization data
  @IsString()
  type: string;

  @IsString()
  name: string;

  @IsString()
  subdomain: string;

  @IsString()
  status: string;

  // Owner user data
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
