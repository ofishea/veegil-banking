import { IsString, IsEmail, IsPhoneNumber, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('NG')
  phoneNumber: string;

  @IsString()
  accountNumber: string;

  @IsNumber()
  accountBalance: number;
}
