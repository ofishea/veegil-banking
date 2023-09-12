import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
require("dotenv").config();
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtMiddleware } from '../middlewares/jwt.middleware';
import { JwtAuthGuard } from '../auth/auth.guard';
import { User, UserDocument, UserSchema } from '../database/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphqlMiddleware } from '../middlewares/graphql.middleware';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({ 
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'], 
      context: ({ req }) => ({ req }),
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }, 
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
  ],
  providers: [AuthService, AuthResolver, UsersService],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(GraphqlMiddleware).forRoutes('*');
    }
  }
