import { IsString, IsNotEmpty } from 'class-validator';

export class CreateResourceDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsNotEmpty()
  label: string;
}
