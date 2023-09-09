import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { TransactionHistoryModule } from './transaction-history/transaction-history.module';

@Module({
  imports: [DatabaseModule, UsersModule, TransactionHistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
