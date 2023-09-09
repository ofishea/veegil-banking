import { IsDate, IsNumber } from 'class-validator';

export class UpdateTransactionHistoryDto {
  @IsDate()
  transactionDate: Date;

  @IsNumber()
  amount: number;
}
