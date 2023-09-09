import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TransactionHistory {
  @Prop()
  transactionDate: Date;

  @Prop()
  amount: number;
}

export type TransactionHistoryDocument = TransactionHistory & Document;

export const TransactionHistorySchema = SchemaFactory.createForClass(TransactionHistory);
