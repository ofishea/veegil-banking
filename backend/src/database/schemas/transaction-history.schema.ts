import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TransactionHistory {
  @Prop()
  reference: string;

  @Prop()
  amount: number;
  
  @Prop()
  toAccountNumber: number;
  
  @Prop()
  toAccountName: string;
  
  @Prop()
  fromAccountNumber: number;
  
  @Prop()
  fromAccountName: string;
  
  @Prop()
  type: string;

  @Prop()
  date: string;
  
  @Prop()
  time: string;
}

export type TransactionHistoryDocument = TransactionHistory & Document;

export const TransactionHistorySchema = SchemaFactory.createForClass(TransactionHistory);
