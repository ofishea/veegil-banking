import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionHistoryController } from './transaction-history.controller';
import { TransactionHistoryService } from './transaction-history.service';
import { User, UserSchema } from '../database/schemas/user.schema';
import { TransactionHistory, TransactionHistorySchema } from '../database/schemas/transaction-history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: TransactionHistory.name, schema: TransactionHistorySchema }]),
  ],
  controllers: [TransactionHistoryController],
  providers: [TransactionHistoryService],
})
export class TransactionHistoryModule {}