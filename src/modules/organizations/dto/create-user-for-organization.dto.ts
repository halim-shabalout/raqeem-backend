export class CreateUserForOrganizationDto {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  lang?: string;
}
