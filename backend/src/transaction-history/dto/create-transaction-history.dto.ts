import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateTransactionHistoryDto {
  @IsString()
  reference: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  toAccountNumber: number;

  @IsString()
  toAccountName: string;

  @IsNumber()
  fromAccountNumber: number;

  @IsString()
  fromAccountName: string;

  @IsString()
  type: string;

  @IsString()
  date: string;

  @IsString()
  time: string;
}
