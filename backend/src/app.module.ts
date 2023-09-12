import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { TransactionHistoryModule } from './transaction-history/transaction-history.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, UsersModule, TransactionHistoryModule, AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
