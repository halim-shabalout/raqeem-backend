import { IsMongoId, IsNotEmpty, ArrayNotEmpty } from 'class-validator';

export class CreateRolePermissionDto {
  @IsMongoId()
  @IsNotEmpty()
  organization: string;

  @IsMongoId()
  @IsNotEmpty()
  role: string;

  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  permissions: string[];
}
