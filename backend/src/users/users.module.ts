import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { User, UserSchema } from '../database/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [AuthService, JwtService, UsersService],
})
export class UsersModule {}
