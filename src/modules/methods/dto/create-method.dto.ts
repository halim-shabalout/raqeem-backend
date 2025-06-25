import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMethodDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsNotEmpty()
  label: string;
}
