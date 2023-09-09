import { IsDate, IsNumber } from 'class-validator';

export class CreateTransactionHistoryDto {
  @IsDate()
  transactionDate: Date;

  @IsNumber()
  amount: number;
}
