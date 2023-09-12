import { Injectable } from '@nestjs/common';
require("dotenv").config();
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserInput, AuthInput } from './user.dto';
import { CreateUserDto, UpdateUserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.usersService.authenticateUser(email, password);
    if (!user) {
      return null;
    }

    const payload = { fullName: user.fullName, email: user.email, phoneNumber: user.phoneNumber, accountNumber: user.accountNumber, accountBalance: user.accountBalance };
    const token = this.jwtService.sign(payload, { secret: `${process.env.JWT_SECRET_KEY}` });
    return token;
  }

  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      return payload;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}