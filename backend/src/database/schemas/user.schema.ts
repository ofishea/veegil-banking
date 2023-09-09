import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose'; // Update this line

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

  @Prop({ type: [{ type: Types.ObjectId, ref: 'TransactionHistory' }] }) // Update this line
  transactionHistory: Types.ObjectId[]; // Update this line
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
