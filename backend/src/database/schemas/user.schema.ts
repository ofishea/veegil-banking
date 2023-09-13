import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema()
export class User {
  @Prop()
  fullName: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ unique: true })
  phoneNumber: string;

  @Prop({ unique: true })
  accountNumber: string;

  @Prop()
  accountBalance: number;

  @Prop([{ type: SchemaTypes.Mixed }])
  transactionHistory: any[];

  @Prop()
  password: string; 
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
