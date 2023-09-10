import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User {
  @Prop()
  fullName: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  accountNumber: string;

  @Prop()
  accountBalance: number;

  @Prop()
  password: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'TransactionHistory' }] })
  transactionHistory: Types.ObjectId[];
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
